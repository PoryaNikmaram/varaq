export type AppLocale = 'fa' | 'en'

export function directionFor(locale: AppLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr'
}

export function documentLang(locale: AppLocale): 'fa-IR' | 'en' {
  return locale === 'fa' ? 'fa-IR' : 'en'
}

export function applyDocumentLocale(locale: AppLocale): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = documentLang(locale)
  document.documentElement.dir = directionFor(locale)
}

export function formatNumber(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en').format(value)
}

export function speechLang(locale: AppLocale): 'fa-IR' | 'en-US' {
  return locale === 'fa' ? 'fa-IR' : 'en-US'
}
