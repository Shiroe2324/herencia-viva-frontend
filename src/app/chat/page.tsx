'use client';

import { toast } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import AuthGuard from '@/components/AuthGuard';
import ChatEmptyState from '@/components/chat/ChatEmptyState';
import ChatFooter from '@/components/chat/ChatFooter';
import type { ChatMessageData } from '@/components/chat/ChatMessage';
import ChatMessageList from '@/components/chat/ChatMessageList';
import ChatMobileHeader from '@/components/chat/ChatMobileHeader';
import ChatSidebar from '@/components/chat/ChatSidebar';
import KnowledgeScopeModal from '@/components/chat/KnowledgeScopeModal';
import { askStream } from '@/lib/sse';

let messageCounter = 0;
function nextId() {
  return `msg-${++messageCounter}-${Date.now()}`;
}

const WELCOME_MESSAGE: ChatMessageData = {
  id: 'welcome',
  role: 'assistant',
  content:
    '¡Hola! Soy tu asistente de agricultura.\n\nPuedo ayudarte con preguntas sobre **cultivos y cosechas**, **salud de plantas y plagas**, **rotación de cultivos**, **nutrición del suelo** y **productividad agrícola**.\n\n¿Sobre qué te gustaría consultar hoy?',
};

const TYPEWRITER_DELAY_MS = 14;

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const typingIntervalRef = useRef<number | null>(null);
  const pendingTextRef = useRef('');
  const streamDoneRef = useRef(false);
  const activeAiMsgIdRef = useRef<string | null>(null);

  function stopTypingProcessor() {
    if (typingIntervalRef.current !== null) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }

  function finishStreamingMessage(aiMsgId: string) {
    setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, isStreaming: false } : m)));
    setIsStreaming(false);
    stopTypingProcessor();
    streamDoneRef.current = false;
  }

  function ensureTypingProcessor(aiMsgId: string) {
    if (typingIntervalRef.current !== null) return;

    typingIntervalRef.current = window.setInterval(() => {
      const nextChar = pendingTextRef.current[0];

      if (nextChar) {
        pendingTextRef.current = pendingTextRef.current.slice(1);
        setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: m.content + nextChar } : m)));
        return;
      }

      if (streamDoneRef.current) {
        finishStreamingMessage(aiMsgId);
      }
    }, TYPEWRITER_DELAY_MS);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      stopTypingProcessor();
      abortRef.current?.abort();
    };
  }, []);

  function startNewChat() {
    abortRef.current?.abort();
    stopTypingProcessor();
    pendingTextRef.current = '';
    streamDoneRef.current = false;
    activeAiMsgIdRef.current = null;
    setMessages([WELCOME_MESSAGE]);
    setIsStreaming(false);
    setIsSidebarOpen(false);
  }

  const handleQuestion = useCallback(
    (question: string) => {
      if (isStreaming) return;

      const userMsg: ChatMessageData = {
        id: nextId(),
        role: 'user',
        content: question,
      };

      const aiMsgId = nextId();
      const aiMsg: ChatMessageData = {
        id: aiMsgId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, aiMsg]);
      setIsStreaming(true);
      pendingTextRef.current = '';
      streamDoneRef.current = false;
      activeAiMsgIdRef.current = aiMsgId;

      const controller = askStream(question, {
        onChunk: (chunk) => {
          if (!chunk) return;
          pendingTextRef.current += chunk;
          ensureTypingProcessor(aiMsgId);
        },
        onDone: () => {
          streamDoneRef.current = true;
          if (!pendingTextRef.current) {
            finishStreamingMessage(aiMsgId);
          }
        },
        onError: (errorMsg) => {
          stopTypingProcessor();
          pendingTextRef.current = '';
          streamDoneRef.current = false;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId
                ? { ...m, content: m.content.length > 0 ? m.content : 'Lo siento, ocurrió un error al procesar tu consulta.', isStreaming: false }
                : m,
            ),
          );
          toast.danger('Error al procesar tu consulta', { description: errorMsg });
          setIsStreaming(false);
        },
      });

      abortRef.current = controller;
    },
    [isStreaming],
  );

  function handleStop() {
    abortRef.current?.abort();
    stopTypingProcessor();
    pendingTextRef.current = '';
    streamDoneRef.current = false;
    setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)));
    setIsStreaming(false);
  }

  const isWelcomeScreen = messages.length === 1 && messages[0].id === 'welcome';

  return (
    <AuthGuard>
      <div className='bg-background flex h-screen overflow-hidden'>
        {isKnowledgeModalOpen && <KnowledgeScopeModal onClose={() => setIsKnowledgeModalOpen(false)} />}

        <>
          {isSidebarOpen && <div className='fixed inset-0 z-20 bg-black/60 lg:hidden' onClick={() => setIsSidebarOpen(false)} />}

          <div
            className={`fixed z-30 h-full transition-transform duration-300 ease-in-out lg:relative lg:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
          >
            <ChatSidebar onNewChat={startNewChat} />
          </div>
        </>

        <div className='flex min-w-0 flex-1 flex-col'>
          <ChatMobileHeader onToggleSidebar={() => setIsSidebarOpen((v) => !v)} onOpenInfo={() => setIsKnowledgeModalOpen(true)} />

          <main className='flex-1 overflow-hidden'>
            {isWelcomeScreen ? (
              <ChatEmptyState onSelectQuestion={handleQuestion} disabled={isStreaming} />
            ) : (
              <ChatMessageList messages={messages} isStreaming={isStreaming} bottomRef={bottomRef} />
            )}
          </main>

          <ChatFooter isStreaming={isStreaming} onSubmit={handleQuestion} onStop={handleStop} onOpenInfo={() => setIsKnowledgeModalOpen(true)} />
        </div>
      </div>
    </AuthGuard>
  );
}
