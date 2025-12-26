// Country name translations for the application

export const countryNames: Record<string, { ru: string; en: string }> = {
  'Russia': { ru: 'Россия', en: 'Russia' },
  'USA': { ru: 'США', en: 'USA' },
  'China': { ru: 'Китай', en: 'China' },
  'UAE': { ru: 'ОАЭ', en: 'UAE' },
  'Turkey': { ru: 'Турция', en: 'Turkey' },
  'Kazakhstan': { ru: 'Казахстан', en: 'Kazakhstan' },
  'Uzbekistan': { ru: 'Узбекистан', en: 'Uzbekistan' },
  'Thailand': { ru: 'Таиланд', en: 'Thailand' },
  'Vietnam': { ru: 'Вьетнам', en: 'Vietnam' },
  'India': { ru: 'Индия', en: 'India' },
  'Germany': { ru: 'Германия', en: 'Germany' },
  'France': { ru: 'Франция', en: 'France' },
  'UK': { ru: 'Великобритания', en: 'UK' },
  'Spain': { ru: 'Испания', en: 'Spain' },
  'Italy': { ru: 'Италия', en: 'Italy' },
  'Georgia': { ru: 'Грузия', en: 'Georgia' },
  'Armenia': { ru: 'Армения', en: 'Armenia' },
  'Belarus': { ru: 'Беларусь', en: 'Belarus' },
  'Serbia': { ru: 'Сербия', en: 'Serbia' },
  'Montenegro': { ru: 'Черногория', en: 'Montenegro' },
};

export const translateCountry = (country: string, language: 'ru' | 'en'): string => {
  return countryNames[country]?.[language] || country;
};
