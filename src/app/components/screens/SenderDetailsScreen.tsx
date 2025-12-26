import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChipButton } from '../ui/ChipButton';
import { ToggleButton } from '../ui/ToggleButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

interface SenderDetailsScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onNext: (details: { cash: boolean; legal: boolean }) => void;
  onBack?: () => void;
}

export function SenderDetailsScreen({ language, onLanguageToggle, onNext, onBack }: SenderDetailsScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'account' | null>(null);
  const [legal, setLegal] = useState(false);

  const content = {
    ru: {
      prompt: 'Уточните детали отправителя:',
      paymentMethodLabel: 'Способ оплаты:',
      cashLabel: '💵 Наличные',
      accountLabel: '🏦 Безналичные',
      legalLabel: 'Плательщик — юрлицо',
      button: 'Далее',
      backButton: 'Назад',
    },
    en: {
      prompt: 'Specify sender details:',
      paymentMethodLabel: 'Payment method:',
      cashLabel: '💵 Cash',
      accountLabel: '🏦 Non-cash',
      legalLabel: 'Sender is a company',
      button: 'Next',
      backButton: 'Back',
    },
  };

  const handleNext = () => {
    if (paymentMethod) {
      onNext({ cash: paymentMethod === 'cash', legal });
    }
  };

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800">{content[language].prompt}</h2>
        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-600 mb-1">{content[language].paymentMethodLabel}</div>
          <div className="grid grid-cols-2 gap-3">
            <ChipButton
              selected={paymentMethod === 'cash'}
              onClick={() => setPaymentMethod('cash')}
            >
              {content[language].cashLabel}
            </ChipButton>
            <ChipButton
              selected={paymentMethod === 'account'}
              onClick={() => setPaymentMethod('account')}
            >
              {content[language].accountLabel}
            </ChipButton>
          </div>
          
          <ToggleButton label={content[language].legalLabel} checked={legal} onChange={setLegal} />
          
          <div className="mt-4">
            <PrimaryButton onClick={handleNext} disabled={!paymentMethod}>
              {content[language].button}
            </PrimaryButton>
          </div>
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