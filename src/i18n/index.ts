import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as en from './en';
import * as es from './es';
import * as ptBR from './pt-BR';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': ptBR,
      en,
      es,
    },
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  });
