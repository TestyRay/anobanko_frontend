import React from 'react';
import { Globe } from 'lucide-react';
interface ScreenLayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
  showLanguageSwitch?: boolean;
  currentLanguage?: 'ru' | 'en';
  onLanguageToggle?: () => void;
  className?: string;
}

export function ScreenLayout({
  children,
  showLogo = false,
  showLanguageSwitch = false,
  currentLanguage = 'ru',
  onLanguageToggle,
  className = '',
}: ScreenLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white ${className}`}>
      <div className="max-w-[390px] mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          {showLogo ? (
            <div className="w-12 h-12">
                <img
                    src="/logo.png"
                    alt="Anobanko"
                    className="w-32 h-32 object-contain"
                />
            </div>
          ) : (
            <div />
          )}

          {showLanguageSwitch && (
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-sm"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLanguage === 'ru' ? 'English' : 'Русский'}</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
}