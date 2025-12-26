import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChipButton } from '../ui/ChipButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

interface FromCurrencyScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onNext: (currency: string) => void;
  fromCountry?: string;
  onBack?: () => void;
}

export function FromCurrencyScreen({ language, onLanguageToggle, onNext, fromCountry, onBack }: FromCurrencyScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCurrency, setCustomCurrency] = useState('');

  // Filter currencies based on selected country
  const getAvailableCurrencies = () => {
    const crypto = ['BTC', 'USDT', 'ETH'];
    
    switch (fromCountry) {
      case 'Russia':
      case 'Россия':
        return ['RUB', 'EUR', 'USD', ...crypto];
      case 'Europe':
      case 'Европа':
        return ['EUR', ...crypto];
      case 'USA':
      case 'США':
        return ['USD', ...crypto];
      case 'Crypto':
      case 'Крипта':
        return crypto;
      case 'Other country':
      case 'Другая страна':
        return ['RUB', 'EUR', 'USD', ...crypto];
      default:
        // If custom country entered, show all currencies
        return ['RUB', 'EUR', 'USD', ...crypto];
    }
  };

  const content = {
    ru: {
      prompt: 'Выберите валюту платежа:',
      options: [...getAvailableCurrencies(), 'Другая'],
      inputLabel: 'Введите валюту платежа:',
      placeholder: 'Например: GBP',
      button: 'Далее',
      backButton: 'Назад',
    },
    en: {
      prompt: 'Select payment currency:',
      options: [...getAvailableCurrencies(), 'Other'],
      inputLabel: 'Enter payment currency:',
      placeholder: 'e.g., GBP',
      button: 'Next',
      backButton: 'Back',
    },
  };

  const handleSelect = (option: string) => {
    if (option === 'Другая' || option === 'Other') {
      setShowCustomInput(true);
      setSelected(null);
    } else {
      setSelected(option);
      setShowCustomInput(false);
    }
  };

  const handleNext = () => {
    if (showCustomInput && customCurrency) {
      onNext(customCurrency);
    } else if (selected) {
      onNext(selected);
    }
  };

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800">{showCustomInput ? content[language].inputLabel : content[language].prompt}</h2>

        {showCustomInput ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={customCurrency}
              onChange={(e) => setCustomCurrency(e.target.value.toUpperCase())}
              placeholder={content[language].placeholder}
              className="w-full px-6 py-4 rounded-[10px] border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white"
            />
            <PrimaryButton onClick={handleNext} disabled={!customCurrency}>
              {content[language].button}
            </PrimaryButton>
            {onBack && (
              <SecondaryButton onClick={onBack}>
                {content[language].backButton}
              </SecondaryButton>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              {content[language].options.map((option) => (
                <ChipButton key={option} selected={selected === option} onClick={() => handleSelect(option)}>
                  {option}
                </ChipButton>
              ))}
            </div>
            {selected && (
              <div className="mt-4 flex flex-col gap-3">
                <PrimaryButton onClick={handleNext}>{content[language].button}</PrimaryButton>
                {onBack && (
                  <SecondaryButton onClick={onBack}>
                    {content[language].backButton}
                  </SecondaryButton>
                )}
              </div>
            )}
            {!selected && onBack && (
              <div className="mt-4">
                <SecondaryButton onClick={onBack}>
                  {content[language].backButton}
                </SecondaryButton>
              </div>
            )}
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}