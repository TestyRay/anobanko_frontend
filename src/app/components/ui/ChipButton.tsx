import React from 'react';

interface ChipButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export function ChipButton({ children, onClick, selected, className = '' }: ChipButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-[10px] border-2 transition-all ${
        selected
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
      } ${className}`}
    >
      {children}
    </button>
  );
}