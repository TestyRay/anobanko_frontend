import React, { useState } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';
import { ChipButton } from '../ui/ChipButton';
import { ToggleButton } from '../ui/ToggleButton';
import { InfoCard } from '../ui/InfoCard';
import { ChatMessage } from '../ui/ChatMessage';

interface DesignSystemScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
}

export function DesignSystemScreen({ language, onLanguageToggle }: DesignSystemScreenProps) {
  const [chipSelected, setChipSelected] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);

  const content = {
    ru: {
      title: 'Дизайн-система',
      primaryButton: 'Первичная кнопка',
      secondaryButton: 'Вторичная кнопка',
      chipButton: 'Chip кнопка',
      toggleExample: 'Пример переключателя',
      infoCardTitle: 'Info Card',
      infoCardContent: 'Это пример информационной карточки с закругленными углами и тенью.',
      chatMessageTitle: 'Chat Message',
      chatMessageContent: 'Это пример сообщения в чате от менеджера Анны.',
    },
    en: {
      title: 'Design System',
      primaryButton: 'Primary Button',
      secondaryButton: 'Secondary Button',
      chipButton: 'Chip Button',
      toggleExample: 'Toggle Example',
      infoCardTitle: 'Info Card',
      infoCardContent: 'This is an example of an info card with rounded corners and shadow.',
      chatMessageTitle: 'Chat Message',
      chatMessageContent: 'This is an example of a chat message from manager Anna.',
    },
  };

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-8 py-8">
        <h1 className="text-center text-2xl text-gray-800">{content[language].title}</h1>

        {/* Primary Button */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Primary Button</div>
          <PrimaryButton>{content[language].primaryButton}</PrimaryButton>
        </div>

        {/* Secondary Button */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Secondary Button</div>
          <div className="text-center">
            <SecondaryButton>{content[language].secondaryButton}</SecondaryButton>
          </div>
        </div>

        {/* Chip Buttons */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Chip Buttons</div>
          <div className="flex gap-3 flex-wrap">
            <ChipButton selected={chipSelected} onClick={() => setChipSelected(!chipSelected)}>
              {content[language].chipButton} 1
            </ChipButton>
            <ChipButton>{content[language].chipButton} 2</ChipButton>
            <ChipButton>{content[language].chipButton} 3</ChipButton>
          </div>
        </div>

        {/* Toggle */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Toggle</div>
          <ToggleButton label={content[language].toggleExample} checked={toggleChecked} onChange={setToggleChecked} />
        </div>

        {/* Info Card */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Info Card</div>
          <InfoCard>
            <h3 className="text-gray-800 mb-2">{content[language].infoCardTitle}</h3>
            <p className="text-gray-600 text-sm">{content[language].infoCardContent}</p>
          </InfoCard>
        </div>

        {/* Chat Message */}
        <div>
          <div className="text-sm text-gray-500 mb-2">Chat Message</div>
          <ChatMessage time="12:34">
            <div className="flex items-start gap-2">
              <span className="text-2xl">👩‍💼</span>
              <div>
                <div className="text-xs text-gray-500 mb-1">Anna</div>
                <p className="text-gray-800 text-sm">{content[language].chatMessageContent}</p>
              </div>
            </div>
          </ChatMessage>
        </div>
      </div>
    </ScreenLayout>
  );
}