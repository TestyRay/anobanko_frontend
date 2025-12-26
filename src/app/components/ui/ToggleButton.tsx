import React from 'react';

interface ToggleButtonProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleButton({ label, checked, onChange, className = '' }: ToggleButtonProps) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-[10px] bg-white border-2 transition-all ${
        checked ? 'border-green-500 bg-green-50' : 'border-gray-300'
      } ${className}`}
    >
      <span className="text-gray-800">{label}</span>
      <span className="text-2xl">{checked ? '✅' : '❌'}</span>
    </button>
  );
}