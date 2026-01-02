import React, { useState } from 'react';
import { HomeScreen } from './components/screens/HomeScreen';
import { FromCountryScreen } from './components/screens/FromCountryScreen';
import { FromCurrencyScreen } from './components/screens/FromCurrencyScreen';
import { AmountChoiceScreen } from './components/screens/AmountChoiceScreen';
import { AmountInputScreen } from './components/screens/AmountInputScreen';
import { SenderDetailsScreen } from './components/screens/SenderDetailsScreen';
import { ToCountryScreen } from './components/screens/ToCountryScreen';
import { ToCurrencyScreen } from './components/screens/ToCurrencyScreen';
import { RecipientDetailsScreen } from './components/screens/RecipientDetailsScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';
import { RequestReceivedScreen } from './components/screens/RequestReceivedScreen';
import { AnnaMessageScreen } from './components/screens/AnnaMessageScreen';
import { ReminderScreen } from './components/screens/ReminderScreen';
import { PostCompletionScreen } from './components/screens/PostCompletionScreen';
import { DesignSystemScreen } from './components/screens/DesignSystemScreen';

type Screen =
  | 'design-system'
  | 'home'
  | 'from-country'
  | 'from-currency'
  | 'amount-choice'
  | 'amount-input'
  | 'sender-details'
  | 'to-country'
  | 'to-currency'
  | 'recipient-details'
  | 'confirmation'
  | 'request-received'
  | 'anna-30sec'
  | 'anna-1min'
  | 'reminder-few-days'
  | 'reminder-last'
  | 'reminder-soft-close'
  | 'post-review'
  | 'post-repeat'
  | 'post-reactivation-90'
  | 'post-reactivation-180';

interface TransferData {
  fromCountry: string;
  fromCurrency: string;
  amountType: 'send' | 'receive';
  fromAmount?: string;
  toAmount?: string;
  senderCash: boolean;
  senderLegal: boolean;
  toCountry: string;
  toCurrency: string;
  recipientCash: boolean;
  recipientLegal: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [transferData, setTransferData] = useState<Partial<TransferData>>({});
  const [requestId] = useState('12345');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const handleStartTransfer = () => {
    setCurrentScreen('from-country');
  };

  const handleFromCountry = (country: string) => {
    setTransferData((prev) => ({ ...prev, fromCountry: country }));
    setCurrentScreen('from-currency');
  };

  const handleFromCurrency = (currency: string) => {
    setTransferData((prev) => ({ ...prev, fromCurrency: currency }));
    
    // Check if crypto - skip sender details
    const isCrypto = ['BTC', 'USDT', 'ETH'].includes(currency);
    if (isCrypto) {
      // Set default values for sender details
      setTransferData((prev) => ({ ...prev, senderCash: false, senderLegal: false }));
      setCurrentScreen('to-country');
    } else {
      setCurrentScreen('sender-details');
    }
  };

  const handleSenderDetails = (details: { cash: boolean; legal: boolean }) => {
    setTransferData((prev) => ({ ...prev, senderCash: details.cash, senderLegal: details.legal }));
    setCurrentScreen('to-country');
  };

  const handleToCountry = (country: string) => {
    setTransferData((prev) => ({ ...prev, toCountry: country }));
    setCurrentScreen('to-currency');
  };

  const handleToCurrency = (currency: string) => {
    setTransferData((prev) => ({ ...prev, toCurrency: currency }));
    
    // Check if crypto - skip recipient details
    const isCrypto = ['BTC', 'USDT', 'ETH'].includes(currency);
    if (isCrypto) {
      // Set default values for recipient details
      setTransferData((prev) => ({ ...prev, recipientCash: false, recipientLegal: false }));
      setCurrentScreen('amount-choice');
    } else {
      setCurrentScreen('recipient-details');
    }
  };

  const handleRecipientDetails = (details: { cash: boolean; legal: boolean }) => {
    setTransferData((prev) => ({ ...prev, recipientCash: details.cash, recipientLegal: details.legal }));
    setCurrentScreen('amount-choice');
  };

  const handleAmountChoice = (choice: 'send' | 'receive') => {
    setTransferData((prev) => ({ ...prev, amountType: choice }));
    setCurrentScreen('amount-input');
  };

  const handleAmountInput = (amount: string) => {
    if (transferData.amountType === 'send') {
      setTransferData((prev) => ({ ...prev, fromAmount: amount }));
    } else {
      setTransferData((prev) => ({ ...prev, toAmount: amount }));
    }
    setCurrentScreen('confirmation');
  };

  const handleConfirm = () => {
    setCurrentScreen('request-received');
  };

  const handleEdit = () => {
    setCurrentScreen('from-country');
  };

  const handleGoToWebsite = () => {
    window.open('https://anobanko.com', '_blank');
  };

  // Handle back navigation
  const handleBack = () => {
    // Check if crypto to determine correct back navigation
    const isFromCrypto = ['BTC', 'USDT', 'ETH'].includes(transferData.fromCurrency || '');
    const isToCrypto = ['BTC', 'USDT', 'ETH'].includes(transferData.toCurrency || '');
    
    const navigationMap: Record<Screen, Screen> = {
      'from-country': 'home',
      'from-currency': 'from-country',
      'sender-details': 'from-currency',
      'to-country': isFromCrypto ? 'from-currency' : 'sender-details',
      'to-currency': 'to-country',
      'recipient-details': 'to-currency',
      'amount-choice': isToCrypto ? 'to-currency' : 'recipient-details',
      'amount-input': 'amount-choice',
      'confirmation': 'amount-input',
      'design-system': 'home',
      'home': 'home',
      'request-received': 'home',
      'anna-30sec': 'home',
      'anna-1min': 'home',
      'reminder-few-days': 'home',
      'reminder-last': 'home',
      'reminder-soft-close': 'home',
      'post-review': 'home',
      'post-repeat': 'home',
      'post-reactivation-90': 'home',
      'post-reactivation-180': 'home',
    };
    
    const previousScreen = navigationMap[currentScreen];
    if (previousScreen) {
      setCurrentScreen(previousScreen);
    }
  };

  // Navigation buttons for demo purposes
  const renderNavigationButtons = () => {
    const demoScreens: { label: string; screen: Screen }[] = [
      { label: '01 Design System', screen: 'design-system' },
      { label: '03 Home', screen: 'home' },
      { label: '04 From Country', screen: 'from-country' },
      { label: '05 From Currency', screen: 'from-currency' },
      { label: '07 Sender Details', screen: 'sender-details' },
      { label: '12 To Country', screen: 'to-country' },
      { label: '13 To Currency', screen: 'to-currency' },
      { label: '14 Recipient Details', screen: 'recipient-details' },
      { label: '06 Amount Choice', screen: 'amount-choice' },
      { label: '08 Amount Input', screen: 'amount-input' },
      { label: '15 Confirmation', screen: 'confirmation' },
      { label: '16 Request Received', screen: 'request-received' },
      { label: '17 Anna 30sec', screen: 'anna-30sec' },
      { label: '18 Anna 1min', screen: 'anna-1min' },
      { label: '19 Reminder Few Days', screen: 'reminder-few-days' },
      { label: '20 Last Reminder', screen: 'reminder-last' },
      { label: '21 Soft Close', screen: 'reminder-soft-close' },
      { label: '22 Review Request', screen: 'post-review' },
      { label: '23 Repeat Offer', screen: 'post-repeat' },
      { label: '24 Reactivation 90', screen: 'post-reactivation-90' },
      { label: '25 Reactivation 180', screen: 'post-reactivation-180' },
    ];
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'design-system':
        return <DesignSystemScreen language={language} onLanguageToggle={toggleLanguage} />;

      case 'home':
        return <HomeScreen language={language} onLanguageToggle={toggleLanguage} onStartTransfer={handleStartTransfer} />;

      case 'from-country':
        return <FromCountryScreen language={language} onLanguageToggle={toggleLanguage} onNext={handleFromCountry} onBack={handleBack} />;

      case 'from-currency':
        return <FromCurrencyScreen language={language} onLanguageToggle={toggleLanguage} onNext={handleFromCurrency} fromCountry={transferData.fromCountry} onBack={handleBack} />;

      case 'amount-choice':
        return <AmountChoiceScreen language={language} onLanguageToggle={toggleLanguage} onChoice={handleAmountChoice} onBack={handleBack} />;

      case 'amount-input':
        return (
          <AmountInputScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            onNext={handleAmountInput}
            type={transferData.amountType || 'send'}
            currency={transferData.amountType === 'send' ? transferData.fromCurrency : transferData.toCurrency}
            onBack={handleBack}
          />
        );

      case 'sender-details':
        return <SenderDetailsScreen language={language} onLanguageToggle={toggleLanguage} onNext={handleSenderDetails} onBack={handleBack} />;

      case 'to-country':
        return (
          <ToCountryScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            onNext={handleToCountry}
            excludeCountry={transferData.fromCountry}
            onBack={handleBack}
          />
        );

      case 'to-currency':
        return (
          <ToCurrencyScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            onNext={handleToCurrency}
            excludeCurrency={transferData.fromCurrency}
            toCountry={transferData.toCountry}
            onBack={handleBack}
          />
        );

      case 'recipient-details':
        return <RecipientDetailsScreen language={language} onLanguageToggle={toggleLanguage} onSubmit={handleRecipientDetails} onBack={handleBack} />;

      case 'confirmation':
        return (
          <ConfirmationScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            data={transferData as TransferData}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
            onBack={handleBack}
          />
        );

      case 'request-received':
        return (
          <RequestReceivedScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            requestId={requestId}
            transferData={transferData}
            onGoToWebsite={handleGoToWebsite}
          />
        );

      case 'anna-30sec':
        return (
          <AnnaMessageScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            messageType="30sec"
            fromCountry={transferData.fromCountry || 'Russia'}
            toCountry={transferData.toCountry || 'USA'}
            fromCurrency={transferData.fromCurrency || 'RUB'}
            toCurrency={transferData.toCurrency || 'USD'}
          />
        );

      case 'anna-1min':
        return (
          <AnnaMessageScreen
            language={language}
            onLanguageToggle={toggleLanguage}
            messageType="1min"
            fromCountry={transferData.fromCountry || 'Russia'}
            toCountry={transferData.toCountry || 'USA'}
            fromCurrency={transferData.fromCurrency || 'RUB'}
            toCurrency={transferData.toCurrency || 'USD'}
          />
        );

      case 'reminder-few-days':
        return <ReminderScreen language={language} onLanguageToggle={toggleLanguage} type="few_days" requestId={requestId} />;

      case 'reminder-last':
        return <ReminderScreen language={language} onLanguageToggle={toggleLanguage} type="last" requestId={requestId} />;

      case 'reminder-soft-close':
        return <ReminderScreen language={language} onLanguageToggle={toggleLanguage} type="soft_close" requestId={requestId} />;

      case 'post-review':
        return <PostCompletionScreen language={language} onLanguageToggle={toggleLanguage} type="review" requestId={requestId} />;

      case 'post-repeat':
        return <PostCompletionScreen language={language} onLanguageToggle={toggleLanguage} type="repeat" requestId={requestId} />;

      case 'post-reactivation-90':
        return <PostCompletionScreen language={language} onLanguageToggle={toggleLanguage} type="reactivation_90" requestId={requestId} />;

      case 'post-reactivation-180':
        return <PostCompletionScreen language={language} onLanguageToggle={toggleLanguage} type="reactivation_180" requestId={requestId} />;

      default:
        return <HomeScreen language={language} onLanguageToggle={toggleLanguage} onStartTransfer={handleStartTransfer} />;
    }
  };

  return (
    <div className="relative pb-20">
      {renderScreen()}
    </div>
  );
}
