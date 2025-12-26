import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChatMessage } from '../ui/ChatMessage';

interface ReminderScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  type: 'few_days' | 'last' | 'soft_close';
  requestId: string;
}

export function ReminderScreen({ language, onLanguageToggle, type, requestId }: ReminderScreenProps) {
  const content = {
    ru: {
      anna: '👩‍💼 Анна',
      messageFewDays: `Добрый день!\n\nНапоминаю о вашей заявке №${requestId} на денежный перевод. Мы подготовили для вас несколько выгодных вариантов.\n\nЕсли актуальность сохранилась — дайте знать, и я вышлю детали. Если планы изменились — ничего страшного, всегда рада помочь в будущем!`,
      messageLast: `👋 Это последнее напоминание о заявке №${requestId}.\n\nЕсли сейчас не актуально — без проблем! Просто хотела убедиться, что вы получили всю необходимую информацию.\n\nБуду рада помочь, когда будет нужно.`,
      messageSoftClose: `Видимо, сейчас не актуально — и это нормально! 😊\n\nЯ закрываю заявку №${requestId}, но все данные сохранены. Когда понадобится помощь с переводом — просто напишите, и я моментально подниму историю.\n\nВсегда на связи!`,
    },
    en: {
      anna: '👩‍💼 Anna',
      messageFewDays: `Good day!\n\nReminding you about your request №${requestId} for money transfer. We have prepared several profitable options for you.\n\nIf it's still relevant — let me know and I'll send the details. If plans have changed — no problem, always happy to help in the future!`,
      messageLast: `👋 This is the last reminder about request №${requestId}.\n\nIf it's not relevant now — no worries! Just wanted to make sure you received all the necessary information.\n\nWill be happy to help when needed.`,
      messageSoftClose: `Seems like it's not relevant now — and that's okay! 😊\n\nI'm closing request №${requestId}, but all data is saved. When you need help with a transfer — just write, and I'll instantly retrieve the history.\n\nAlways here for you!`,
    },
  };

  let message = '';
  switch (type) {
    case 'few_days':
      message = content[language].messageFewDays;
      break;
    case 'last':
      message = content[language].messageLast;
      break;
    case 'soft_close':
      message = content[language].messageSoftClose;
      break;
  }

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-4 py-8">
        <div className="text-sm text-gray-500 mb-2">{content[language].anna}</div>
        <ChatMessage>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{message}</p>
        </ChatMessage>
      </div>
    </ScreenLayout>
  );
}