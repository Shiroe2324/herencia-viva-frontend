import type {
  AskRecommendationStreamContentEvent,
  AskRecommendationStreamDoneEvent,
  AskRecommendationStreamErrorEvent,
  AskRecommendationStreamMetadataEvent,
  RecommendationContextItem,
} from '@/lib/api/models';
import { getAccessToken } from '@/lib/auth';
import { API_BASE_URL, API_LANG } from '@/lib/env';
import { refreshSession } from '@/lib/session-refresh';

export type SseEvent =
  AskRecommendationStreamMetadataEvent | AskRecommendationStreamContentEvent | AskRecommendationStreamDoneEvent | AskRecommendationStreamErrorEvent;

const CHUNK_LIMIT = parseInt(process.env.NEXT_PUBLIC_AI_CHUNK_LIMIT ?? '10', 10) || 10;

export interface StreamCallbacks {
  onMetadata?: (question: string, context: RecommendationContextItem[]) => void;
  onChunk: (chunk: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

async function openStream(question: string, signal: AbortSignal): Promise<Response> {
  const token = getAccessToken();
  const params = new URLSearchParams({ question, limit: String(CHUNK_LIMIT) });

  return fetch(`${API_BASE_URL}/recommendations/llm/ask/stream?${params.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      'Cache-Control': 'no-cache',
      'x-lang': API_LANG,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal,
  });
}

export function askStream(question: string, callbacks: StreamCallbacks): AbortController {
  const controller = new AbortController();

  (async () => {
    let response: Response;

    try {
      response = await openStream(question, controller.signal);

      if (response.status === 401) {
        const refreshed = await refreshSession();
        if (refreshed) {
          response = await openStream(question, controller.signal);
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      callbacks.onError('No se pudo conectar con el servidor de IA.');
      return;
    }

    if (!response.ok) {
      if (response.status === 401) {
        callbacks.onError('Sesión expirada. Por favor inicia sesión nuevamente.');
        if (typeof window !== 'undefined') window.location.href = '/login';
      } else if (response.status === 429) {
        callbacks.onError('Demasiadas solicitudes. Intenta de nuevo en un momento.');
      } else if (response.status === 503) {
        callbacks.onError('El servicio de IA no está disponible temporalmente.');
      } else {
        callbacks.onError(`Error del servidor: ${response.status}`);
      }
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      callbacks.onError('No se pudo leer la respuesta del servidor.');
      return;
    }

    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let settled = false;

    try {
      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const messages = buffer.split('\n\n');
        buffer = messages.pop() ?? '';

        for (const message of messages) {
          if (!message.trim()) continue;

          const lines = message.split('\n');
          let dataStr = '';

          for (const line of lines) {
            if (line.startsWith('data:')) {
              dataStr = line.slice(5).trim();
            }
          }

          if (!dataStr) continue;

          let parsed: SseEvent;
          try {
            parsed = JSON.parse(dataStr) as SseEvent;
          } catch (e) {
            console.error('Failed to parse SSE data:', dataStr, e);
            settled = true;
            callbacks.onError(dataStr || 'Respuesta inesperada del servidor.');
            break outer;
          }

          if ((parsed as any).data && typeof (parsed as any).data === 'object') {
            parsed = (parsed as any).data as SseEvent;
          }
          const normalizedType = String(parsed.type).toLowerCase();

          switch (normalizedType) {
            case 'metadata': {
              const metadataEvent = parsed as AskRecommendationStreamMetadataEvent;
              callbacks.onMetadata?.(metadataEvent.question, metadataEvent.context);
              break;
            }
            case 'content': {
              const contentEvent = parsed as AskRecommendationStreamContentEvent;
              callbacks.onChunk(contentEvent.chunk);
              break;
            }
            case 'done':
              settled = true;
              callbacks.onDone();
              break;
            case 'error': {
              const errorEvent = parsed as AskRecommendationStreamErrorEvent;
              settled = true;
              callbacks.onError(errorEvent.error ?? 'Error desconocido del servidor.');
              break;
            }
          }
        }
      }

      if (!settled) {
        callbacks.onError('La conexión con el servidor terminó de forma inesperada.');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        callbacks.onError('La conexión con el servidor fue interrumpida.');
      }
    } finally {
      reader.releaseLock();
    }
  })();

  return controller;
}
