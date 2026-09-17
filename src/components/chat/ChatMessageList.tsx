'use client';

import { ScrollShadow } from '@heroui/react';
import type { RefObject } from 'react';

import ChatMessage from '@/components/chat/ChatMessage';
import type { ChatMessageData } from '@/components/chat/ChatMessage';

export interface ChatMessageListProps {
  messages: ChatMessageData[];
  isStreaming: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({ messages, isStreaming, bottomRef }: ChatMessageListProps) {
  return (
    <ScrollShadow className='h-full'>
      <div className='mx-auto max-w-3xl space-y-6 px-4 py-8'>
        {messages.map((msg) => (
          <div key={msg.id} className='animate-fade-in'>
            {msg.role === 'assistant' && msg.isStreaming && msg.content === '' ? null : <ChatMessage message={msg} />}
          </div>
        ))}

        {isStreaming && messages[messages.length - 1]?.content === '' && (
          <div className='flex items-end gap-3'>
            <div className='bg-surface border-border text-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold'>
              IA
            </div>
            <div className='bg-surface border-border rounded-2xl rounded-bl-sm border px-4 py-3'>
              <div className='flex h-4 items-center gap-1'>
                <span className='bg-accent/60 h-1.5 w-1.5 animate-bounce rounded-full' style={{ animationDelay: '0ms' }} />
                <span className='bg-accent/60 h-1.5 w-1.5 animate-bounce rounded-full' style={{ animationDelay: '150ms' }} />
                <span className='bg-accent/60 h-1.5 w-1.5 animate-bounce rounded-full' style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollShadow>
  );
}
