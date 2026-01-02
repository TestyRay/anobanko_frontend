import React, { useEffect } from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { PrimaryButton } from '../ui/PrimaryButton';

interface RequestReceivedScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  requestId: string;
  onGoToWebsite: () => void;
}

export function RequestReceivedScreen({
  language,
  onLanguageToggle,
  requestId,
  onGoToWebsite,
}: RequestReceivedScreenProps) {
  useEffect(() => {
    const sendToSaleBot = async () => {
      try {
        const tg = (window as any).Telegram?.WebApp;

        if (!tg) {
          console.warn('Telegram WebApp не инициализирован. Callback не отправлен.');
          return;
        }

        const userId = tg.initDataUnsafe?.user?.id;

        if (!userId) {
          console.warn('user_id отсутствует в Telegram WebApp');
        }

        const payload: Record<string, any> = {
          group_id: 'AnobankoTransfer_Bot',
          message: 'form_completed_callback',
          request_id: requestId,
          request_status: 'received',
          user_id: userId,
        };

        const response = await fetch(
          'https://chatter.salebot.pro/api/80ad1cd7a6abb881e200652404f0491d/tg_callback',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        console.log('tg_callback успешно отправлен', payload);
      } catch (error) {
        console.error('Ошибка отправки tg_callback:', error);
      }
    };

    sendToSaleBot();
  }, [requestId]);

  const content = {
    ru: {
      title: 'Ваша заявка уже обрабатывается',
      line2:
        'Менеджер Анна получила ваш запрос и готовит расчет. Обычно это занимает 5–10 минут.',
      line3:
        'Пока ждете, можете посмотреть отзывы наших клиентов на сайте',
      button: '🌐 ПЕРЕЙТИ НА САЙТ',
    },
    en: {
      title: 'Your application is already being processed',
      line2:
        'Manager Anna has received your request and is preparing the calculation. This usually takes 5–10 minutes.',
      line3:
        "While you wait, you can check our clients' reviews on the website",
      button: '🌐 GO TO WEBSITE',
    },
  };

  return (
    <ScreenLayout
      showLogo
      showLanguageSwitch
      currentLanguage={language}
      onLanguageToggle={onLanguageToggle}
    >
      <div className="flex flex-col gap-6 py-8 text-center">
        <h2 className="text-gray-800 leading-relaxed">
          {content[language].title}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {content[language].line2}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {content[language].line3}
        </p>

        <div className="mt-8">
          <PrimaryButton onClick={onGoToWebsite}>
            {content[language].button}
          </PrimaryButton>
        </div>
      </div>
    </ScreenLayout>
  );
}
