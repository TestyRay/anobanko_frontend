import React from 'react';

interface ChatMessageProps {
  children: React.ReactNode;
  time?: string;
  className?: string;
}

export function ChatMessage({ children, time, className = '' }: ChatMessageProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="bg-white rounded-[10px] rounded-tl-sm p-5 shadow-sm border border-gray-200 max-w-[85%]">
        {children}
      </div>
      {time && <span className="text-xs text-gray-400 ml-2">{time}</span>}
    </div>
  );
}