import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

interface AmountInputScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onNext: (amount: string) => void;
  type: 'send' | 'receive';
  currency?: string;
  onBack?: () => void;
}

export function AmountInputScreen({ language, onLanguageToggle, onNext, type, currency, onBack }: AmountInputScreenProps) {
  const [amount, setAmount] = useState('');

  const content = {
    ru: {
      promptSend: 'Введите сумму отправки (например: 50000):',
      promptReceive: 'Введите сумму получения:',
      placeholder: '50000',
      button: 'Получить расчёт',
      backButton: 'Назад',
    },
    en: {
      promptSend: 'Enter the amount to send (e.g., 50000):',
      promptReceive: 'Enter the amount to receive:',
      placeholder: '50000',
      button: 'Get estimate',
      backButton: 'Back',
    },
  };

  const prompt = type === 'send' ? content[language].promptSend : content[language].promptReceive;

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800">{prompt}</h2>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={content[language].placeholder}
              className="w-full px-6 py-4 pr-20 rounded-[10px] border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white text-center text-2xl"
            />
            {currency && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-semibold text-gray-600">
                {currency}
              </div>
            )}
          </div>
          <PrimaryButton onClick={() => onNext(amount)} disabled={!amount || parseFloat(amount) <= 0}>
            {content[language].button}
          </PrimaryButton>
          {onBack && (
            <SecondaryButton onClick={onBack}>
              {content[language].backButton}
            </SecondaryButton>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
}