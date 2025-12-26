import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChipButton } from '../ui/ChipButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

type Language = 'ru' | 'en';

interface FromCountryScreenProps {
  language: Language;
  onLanguageToggle: () => void;
  onNext: (country: string) => void;
  onBack?: () => void;
}

export const FromCountryScreen: React.FC<FromCountryScreenProps> = ({
  language,
  onLanguageToggle,
  onNext,
  onBack,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [customCountry, setCustomCountry] = useState<string>('');

  const content = {
    ru: {
      prompt: 'Выберите страну, ИЗ которой отправляете деньги:',
      options: ['Россия', 'Европа', 'США', 'Крипта', 'Другая страна'],
      inputLabel: 'Введите страну отправления:',
      placeholder: 'Например: Турция',
      button: 'Далее',
      back: 'Назад',
    },
    en: {
      prompt: 'Select country FROM which you send money:',
      options: ['Russia', 'Europe', 'USA', 'Crypto', 'Other country'],
      inputLabel: 'Enter the sending country:',
      placeholder: 'e.g., Turkey',
      button: 'Next',
      back: 'Back',
    },
  } as const;

  const handleSelect = (option: string): void => {
    const isCustom =
      option === 'Другая страна' || option === 'Other country';

    if (isCustom) {
      setShowCustomInput(true);
      setSelected(null);
      setCustomCountry('');
    } else {
      setSelected(option);
      setShowCustomInput(false);
    }
  };

  const handleNext = (): void => {
    if (showCustomInput && customCountry.trim()) {
      onNext(customCountry.trim());
    } else if (selected) {
      onNext(selected);
    }
  };

  const handleBackFromCustom = (): void => {
    setShowCustomInput(false);
    setCustomCountry('');
  };

  return (
    <ScreenLayout
      showLogo
      showLanguageSwitch
      currentLanguage={language}
      onLanguageToggle={onLanguageToggle}
    >
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800 text-lg font-medium">
          {showCustomInput
            ? content[language].inputLabel
            : content[language].prompt}
        </h2>

        {showCustomInput ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={customCountry}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomCountry(e.target.value)
              }
              placeholder={content[language].placeholder}
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <PrimaryButton
              onClick={handleNext}
              disabled={!customCountry.trim()}
            >
              {content[language].button}
            </PrimaryButton>

            <SecondaryButton onClick={handleBackFromCustom}>
              {content[language].back}
            </SecondaryButton>
          </div>
        ) : (

          <div className="flex flex-col gap-3">
            {content[language].options.map((option) => (
              <ChipButton
                key={option}
                selected={selected === option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </ChipButton>
            ))}

            {selected && (
              <div className="mt-4">
                <PrimaryButton onClick={handleNext}>
                  {content[language].button}
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {onBack && !showCustomInput && (
          <div className="mt-4">
            <SecondaryButton onClick={onBack}>
              {content[language].back}
            </SecondaryButton>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
};
