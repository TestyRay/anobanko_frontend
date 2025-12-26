import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { ChatMessage } from '../ui/ChatMessage';

interface PostCompletionScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  type: 'review' | 'repeat' | 'reactivation_90' | 'reactivation_180';
  requestId: string;
}

export function PostCompletionScreen({ language, onLanguageToggle, type, requestId }: PostCompletionScreenProps) {
  const content = {
    ru: {
      anna: '👩‍💼 Анна',
      messageReview: `Здравствуйте!\n\nПрошла неделя после завершения вашего перевода (заявка №${requestId}). Надеюсь, все прошло отлично!\n\nБуду очень благодарна, если поделитесь впечатлениями. Для нас важен каждый отзыв — это помогает становиться лучше.\n\nСпасибо, что выбрали нас! 💙`,
      messageRepeat: `Добрый день!\n\nВспомнила о вашем переводе месяц назад и подумала: возможно, снова актуально?\n\nДля постоянных клиентов у нас специальное предложение — комиссия на 0.5% ниже стандартной. Если нужна помощь — всегда на связи!`,
      message90: `Привет!\n\nДавно не виделись! Если снова появится необходимость в международном переводе — буду рада помочь.\n\nУ нас обновились маршруты и партнеры, так что условия стали еще выгоднее. Пишите в любое время!`,
      message180: `👋 Прошло полгода с момента вашего последнего перевода.\n\nПросто напоминаю, что мы всегда здесь, если понадобится помощь с международными платежами.\n\nВсе данные сохранены, так что процесс будет еще быстрее. До связи!`,
    },
    en: {
      anna: '👩‍💼 Anna',
      messageReview: `Hello!\n\nA week has passed since your transfer was completed (request №${requestId}). I hope everything went great!\n\nI would be very grateful if you could share your impressions. Every review is important to us — it helps us become better.\n\nThank you for choosing us! 💙`,
      messageRepeat: `Good day!\n\nRemembered your transfer from a month ago and thought: perhaps it's relevant again?\n\nFor regular clients we have a special offer — commission 0.5% lower than standard. If you need help — always here!`,
      message90: `Hello!\n\nLong time no see! If you need an international transfer again — will be happy to help.\n\nWe have updated routes and partners, so conditions have become even better. Write anytime!`,
      message180: `👋 Six months have passed since your last transfer.\n\nJust reminding you that we're always here if you need help with international payments.\n\nAll data is saved, so the process will be even faster. See you!`,
    },
  };

  let message = '';
  switch (type) {
    case 'review':
      message = content[language].messageReview;
      break;
    case 'repeat':
      message = content[language].messageRepeat;
      break;
    case 'reactivation_90':
      message = content[language].message90;
      break;
    case 'reactivation_180':
      message = content[language].message180;
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