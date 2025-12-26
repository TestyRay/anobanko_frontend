import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { PrimaryButton } from '../ui/PrimaryButton';

interface HomeScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onStartTransfer: () => void;
}

export function HomeScreen({ language, onLanguageToggle, onStartTransfer }: HomeScreenProps) {
  const content = {
    ru: {
      description: 'Здесь можно оформить денежный перевод из России и в Россию для частных лиц и бизнеса. Комиссия от 3%.',
      button: 'СДЕЛАТЬ ПЕРЕВОД',
    },
    en: {
      description: 'Here you can make a money transfer from/to Russia for individuals and businesses. Commission from 3%.',
      button: 'MAKE TRANSFER',
    },
  };

  return (
    <ScreenLayout showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col items-center justify-between min-h-[600px]">
        <div className="flex-1 flex flex-col items-center justify-center gap-12">
            <img
                src="/logo.png" alt="Anobanko"className="w-32 h-32 object-contain"/>
          <p className="text-center text-gray-700 leading-relaxed px-4">{content[language].description}</p>
        </div>
        <div className="w-full max-w-sm pb-8">
          <PrimaryButton onClick={onStartTransfer}>{content[language].button}</PrimaryButton>
        </div>
      </div>
    </ScreenLayout>
  );
}