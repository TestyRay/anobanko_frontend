import React from 'react';

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ children, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-white rounded-[10px] p-6 shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}