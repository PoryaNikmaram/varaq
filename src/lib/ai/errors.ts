import { translate, type AppLocale } from '@/lib/i18n'

export function localizeAiError(message: string, locale: AppLocale): string {
  if (
    message === 'API_KEY_REQUIRED' ||
    message === 'API key required' ||
    message.startsWith('API key is required')
  ) {
    return translate(locale, 'ai.errors.keyRequired')
  }
  if (message === 'AI_PARSE') return translate(locale, 'ai.errors.parse')
  if (message.startsWith('OpenAI returned an empty') || message.startsWith('Gemini returned an empty')) {
    return translate(locale, 'ai.errors.empty')
  }
  return message
}

export function parseAiJson<T>(text: string): T {
  const cleaned = text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim()
  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error('AI_PARSE')
  }
}
