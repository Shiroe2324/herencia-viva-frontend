'use client';

import { Avatar } from '@heroui/react';
import React from 'react';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export interface ChatMessageProps {
  message: ChatMessageData;
}

function normalizeModelMarkdown(text: string): string {
  return text.replace(/^\s{0,4}([^:\n*][^:\n]{2,}?)\s*:\*\s+/gm, '- **$1:** ');
}

function renderCursor(key: string) {
  return <span key={key} className='bg-accent ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm align-middle' />;
}

function renderMarkdown(rawText: string, showCursor = false): React.ReactNode[] {
  const text = normalizeModelMarkdown(rawText);
  const lines = text.split('\n');
  const lastContentLineIdx = lines.reduce((acc, line, idx) => {
    return line.trim() ? idx : acc;
  }, -1);

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    const isLastContentLine = lineIdx === lastContentLineIdx;

    if (!trimmed) {
      if (showCursor && lastContentLineIdx === -1 && lineIdx === lines.length - 1) {
        return (
          <div key={lineIdx} className='h-2'>
            {renderCursor(`cursor-empty-${lineIdx}`)}
          </div>
        );
      }
      return <div key={lineIdx} className='h-2' />;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = parseInline(headingMatch[2]);
      const headingClass =
        level <= 1
          ? 'text-lg font-semibold text-foreground mt-2 mb-2'
          : level === 2
            ? 'text-base font-semibold text-foreground mt-2 mb-1.5'
            : 'text-sm font-semibold text-foreground/95 mt-2 mb-1';

      return (
        <div key={lineIdx} className={headingClass}>
          {content}
          {showCursor && isLastContentLine ? renderCursor(`cursor-heading-${lineIdx}`) : null}
        </div>
      );
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (bulletMatch) {
      return (
        <div key={lineIdx} className='my-0.5 flex items-start gap-2'>
          <span className='text-accent mt-0.5 shrink-0'>▸</span>
          <span>
            {parseInline(bulletMatch[1])}
            {showCursor && isLastContentLine ? renderCursor(`cursor-bullet-${lineIdx}`) : null}
          </span>
        </div>
      );
    }

    const orderedMatch = trimmed.match(/^\d+[\.)]\s+(.+)$/);
    if (orderedMatch) {
      const marker = trimmed.match(/^\d+[\.)]/)?.[0] ?? '';
      return (
        <div key={lineIdx} className='my-0.5 flex items-start gap-2'>
          <span className='text-accent shrink-0 font-medium'>{marker}</span>
          <span>
            {parseInline(orderedMatch[1])}
            {showCursor && isLastContentLine ? renderCursor(`cursor-ordered-${lineIdx}`) : null}
          </span>
        </div>
      );
    }

    return (
      <div key={lineIdx} className='my-0.5'>
        {parseInline(trimmed)}
        {showCursor && isLastContentLine ? renderCursor(`cursor-text-${lineIdx}`) : null}
      </div>
    );
  });
}

function parseInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    if (match[0].startsWith('**')) {
      result.push(
        <strong key={match.index} className='text-foreground font-semibold'>
          {match[2]}
        </strong>,
      );
    } else if (match[0].startsWith('`')) {
      result.push(
        <code key={match.index} className='bg-background text-foreground/95 rounded px-1 py-0.5 text-[0.92em]'>
          {match[4]}
        </code>,
      );
    } else {
      result.push(
        <em key={match.index} className='text-foreground/80 italic'>
          {match[3]}
        </em>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      <Avatar className='h-8 w-8 shrink-0'>
        <Avatar.Fallback
          className={`text-xs font-bold select-none ${isUser ? 'bg-danger text-foreground' : 'bg-surface border-border text-accent border'}`}
        >
          {isUser ? 'TÚ' : 'IA'}
        </Avatar.Fallback>
      </Avatar>

      <div
        className={`font-body relative max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-danger/20 border-danger/30 text-foreground rounded-br-sm border'
            : 'bg-surface border-border text-foreground/90 rounded-bl-sm border'
        }`}
      >
        <div className='wrap-break-word'>{renderMarkdown(message.content, !!message.isStreaming)}</div>
      </div>
    </div>
  );
}
