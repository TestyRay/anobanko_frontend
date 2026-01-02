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

      const userId =
        tg?.initDataUnsafe?.user?.id ??
        Number(new URLSearchParams(window.location.search).get('user_id'));

      const savedForm = localStorage.getItem('transfer_form');
      const formData = savedForm ? JSON.parse(savedForm) : {};

      const payload: Record<string, any> = {
        group_id: 'AnobankoTransfer_Bot',
        message: 'form_completed_callback',
        request_id: requestId,
        request_status: 'received',

        language: formData.language,
        from_country: formData.from_country,
        from_currency: formData.from_currency,
        sender_cash: formData.sender_cash,
        sender_legal: formData.sender_legal,
        to_country: formData.to_country,
        to_currency: formData.to_currency,
        recipient_cash: formData.recipient_cash,
        recipient_legal: formData.recipient_legal,
        amount_type: formData.amount_type,
        amount: formData.amount,
      };

      if (userId) {
        payload.user_id = userId;
      }

      const response = await fetch('/api/tg-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('tg_callback отправлен', response.status, payload);
    } catch (error) {
      console.error('Ошибка отправки в Salebot:', error);
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
