import type { Languages } from '../interfaces/languages';

export const AVAILABLE_LANGUAGES = [
  {
    value: 'pt-BR',
    label: 'Português (Brasil)',
    englishLabel: 'Português',
  },
  { value: 'en', label: 'English', englishLabel: 'English' },
  {
    value: 'es',
    label: 'Español',
    englishLabel: 'Spanish',
  },
] as {
  label: string;
  value: Languages;
  englishLabel: string;
}[];
