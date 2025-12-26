import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChipButton } from '../ui/ChipButton';
import { SecondaryButton } from '../ui/SecondaryButton';

interface AmountChoiceScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onChoice: (choice: 'send' | 'receive') => void;
  onBack?: () => void;
}

export function AmountChoiceScreen({ language, onLanguageToggle, onChoice, onBack }: AmountChoiceScreenProps) {
  const content = {
    ru: {
      prompt: 'Что вы хотите указать?',
      optionSend: '📤 Сумму отправки',
      optionReceive: '📥 Сумму получения',
      backButton: 'Назад',
    },
    en: {
      prompt: 'What would you like to specify?',
      optionSend: '📤 Amount to send',
      optionReceive: '📥 Amount to receive',
      backButton: 'Back',
    },
  };

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800">{content[language].prompt}</h2>
        <div className="flex flex-col gap-4">
          <ChipButton onClick={() => onChoice('send')}>{content[language].optionSend}</ChipButton>
          <ChipButton onClick={() => onChoice('receive')}>{content[language].optionReceive}</ChipButton>
          {onBack && (
            <div className="mt-4">
              <SecondaryButton onClick={onBack}>
                {content[language].backButton}
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
}