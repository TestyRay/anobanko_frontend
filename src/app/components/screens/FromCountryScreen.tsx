import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChipButton } from '../ui/ChipButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

interface FromCountryScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  onNext: (country: string) => void;
  onBack?: () => void;
}

export function FromCountryScreen({ language, onLanguageToggle, onNext, onBack }: FromCountryScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCountry, setCustomCountry] = useState('');

  const content = {
    ru: {
      prompt: 'Выберите страну, ИЗ которой отправляете деньги:',
      options: ['Россия', 'Европа', 'США', 'Крипта', 'Другая страна'],
      inputLabel: 'Введите страну отправления:',
      placeholder: 'Например: Турция',
      button: 'Далее',
    },
    en: {
      prompt: 'Select country FROM which you send money:',
      options: ['Russia', 'Europe', 'USA', 'Crypto', 'Other country'],
      inputLabel: 'Enter the sending country:',
      placeholder: 'e.g., Turkey',
      button: 'Next',
    },
  };

  const handleSelect = (option: string) => {
    if (option === 'Другая страна' || option === 'Other country') {
      setShowCustomInput(true);
      setSelected(null);
    } else {
      setSelected(option);
      setShowCustomInput(false);
    }
  };

  const handleNext = () => {
    if (showCustomInput && customCountry) {
      onNext(customCountry);
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
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
              placeholder={content[language].placeholder}
              className="w-full px-6 py-4 rounded-[10px] border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white"
            />
            <PrimaryButton onClick={handleNext} disabled={!customCountry}>
              {content[language].button}
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {content[language].options.map((option) => (
              <ChipButton key={option} selected={selected === option} onClick={() => handleSelect(option)}>
                {option}
              </ChipButton>
            ))}
            {selected && (
              <div className="mt-4">
                <PrimaryButton onClick={handleNext}>{content[language].button}</PrimaryButton>
              </div>
            )}
          </div>
        )}
        {onBack && (
          <div className="mt-4">
            <SecondaryButton onClick={onBack}>Назад</SecondaryButton>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}