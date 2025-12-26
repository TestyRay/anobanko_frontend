import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SecondaryButton({ children, onClick, className = '' }: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-[10px] bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}