import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChatMessage } from '../ui/ChatMessage';
import { translateCountry } from '../../utils/translations';

interface AnnaMessageScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  messageType: '30sec' | '1min';
  fromCountry: string;
  toCountry: string;
  fromCurrency: string;
  toCurrency: string;
}

export function AnnaMessageScreen({
  language,
  onLanguageToggle,
  messageType,
  fromCountry,
  toCountry,
  fromCurrency,
  toCurrency,
}: AnnaMessageScreenProps) {
  const fromCountryTranslated = translateCountry(fromCountry, language);
  const toCountryTranslated = translateCountry(toCountry, language);

  const content = {
    ru: {
      anna: '👩‍💼 Анна',
      message30sec: `Здравствуйте! Я уже изучаю ваш запрос на перевод ${fromCountryTranslated} → ${toCountryTranslated}.\n\nСейчас проверяю курс ${fromCurrency}/${toCurrency} у наших партнеров, чтобы предложить вам лучшие условия. Вернусь с расчетом через 5–7 минут.`,
      message1min: `Благодарю за терпение!\n\nСейчас уточняю детали с нашим финансовым отделом — для переводов ${fromCountryTranslated}→${toCountryTranslated} мы всегда согласовываем оптимальный маршрут, чтобы вы получили лучшие условия.\n\nОсталось совсем чуть-чуть.`,
      time30: '00:30',
      time1: '01:00',
    },
    en: {
      anna: '👩‍💼 Anna',
      message30sec: `Hello! I am already reviewing your request for transfer ${fromCountryTranslated} → ${toCountryTranslated}.\n\nCurrently checking the ${fromCurrency}/${toCurrency} rate with our partners to offer you the best conditions. I'll be back with the calculation in 5–7 minutes.`,
      message1min: `Thank you for your patience!\n\nCurrently clarifying details with our financial department — for ${fromCountryTranslated}→${toCountryTranslated} transfers we always coordinate the optimal route to get you the best conditions.\n\nAlmost done.`,
      time30: '00:30',
      time1: '01:00',
    },
  };

  const message = messageType === '30sec' ? content[language].message30sec : content[language].message1min;
  const time = messageType === '30sec' ? content[language].time30 : content[language].time1;

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-4 py-8">
        <div className="text-sm text-gray-500 mb-2">{content[language].anna}</div>
        <ChatMessage time={time}>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{message}</p>
        </ChatMessage>
      </div>
    </ScreenLayout>
  );
}