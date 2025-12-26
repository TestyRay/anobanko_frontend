import React from 'react';
import { ScreenLayout } from '../ui/ScreenLayout';
import { InfoCard } from '../ui/InfoCard';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';
import { translateCountry } from '../../utils/translations';

interface TransferData {
  fromCountry: string;
  fromCurrency: string;
  fromAmount?: string;
  toAmount?: string;
  amountType: 'send' | 'receive';
  senderCash: boolean;
  senderLegal: boolean;
  toCountry: string;
  toCurrency: string;
  recipientCash: boolean;
  recipientLegal: boolean;
}

interface ConfirmationScreenProps {
  language: 'ru' | 'en';
  onLanguageToggle: () => void;
  data: TransferData;
  onConfirm: () => void;
  onEdit: () => void;
  onBack?: () => void;
}

export function ConfirmationScreen({ language, onLanguageToggle, data, onConfirm, onEdit, onBack }: ConfirmationScreenProps) {
  const content = {
    ru: {
      title: '📋 Ваша заявка:',
      from: 'Откуда',
      to: 'Куда',
      amountSend: '💰 Сумма отправки:',
      amountReceive: '💰 Сумма получения:',
      cash: '💵 Наличные',
      legal: '🏢 Юрлицо',
      confirmButton: '✅ Все верно — отправить',
      editButton: '✏️ Изменить',
    },
    en: {
      title: '📋 Your request:',
      from: 'From',
      to: 'To',
      amountSend: '💰 Amount to send:',
      amountReceive: '💰 Amount to receive:',
      cash: '💵 Cash',
      legal: '🏢 Company',
      confirmButton: '✅ Confirm & send',
      editButton: '✏️ Edit',
    },
  };

  return (
    <ScreenLayout showLogo showLanguageSwitch currentLanguage={language} onLanguageToggle={onLanguageToggle}>
      <div className="flex flex-col gap-6 py-8">
        <h2 className="text-center text-gray-800">{content[language].title}</h2>

        <InfoCard>
          <div className="flex flex-col gap-4">
            {/* FROM block */}
            <div>
              <div className="text-sm text-gray-500 mb-1">{content[language].from}</div>
              <div className="text-gray-800">
                🌍 {translateCountry(data.fromCountry, language)} → {data.fromCurrency}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.senderCash && <span className="text-xs px-2 py-1 bg-blue-100 rounded-full">{content[language].cash}</span>}
                {data.senderLegal && <span className="text-xs px-2 py-1 bg-blue-100 rounded-full">{content[language].legal}</span>}
              </div>
            </div>

            {/* Amount */}
            <div className="py-3 border-y border-gray-200">
              <div className="text-gray-800">
                {data.amountType === 'send'
                  ? `${content[language].amountSend} ${data.fromAmount} ${data.fromCurrency}`
                  : `${content[language].amountReceive} ${data.toAmount} ${data.toCurrency}`}
              </div>
            </div>

            {/* TO block */}
            <div>
              <div className="text-sm text-gray-500 mb-1">{content[language].to}</div>
              <div className="text-gray-800">
                🌍 {translateCountry(data.toCountry, language)} → {data.toCurrency}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.recipientCash && <span className="text-xs px-2 py-1 bg-green-100 rounded-full">{content[language].cash}</span>}
                {data.recipientLegal && <span className="text-xs px-2 py-1 bg-green-100 rounded-full">{content[language].legal}</span>}
              </div>
            </div>
          </div>
        </InfoCard>

        <div className="flex flex-col gap-3 mt-4">
          <PrimaryButton onClick={onConfirm}>{content[language].confirmButton}</PrimaryButton>
          <div className="text-center">
            <SecondaryButton onClick={onEdit}>{content[language].editButton}</SecondaryButton>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}