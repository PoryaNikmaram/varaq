import type { AppLocale } from './locale.ts'

const PERSIAN_SCRIPT = /[\u0600-\u06FF]/
const LATIN_SCRIPT = /[A-Za-z]/

export interface ContentLocaleSource {
  contentLocale?: string | null
  personalInfo?: { fullName?: string | null }
  summary?: string | null
}

export function resolveContentLocale(data: ContentLocaleSource): AppLocale {
  if (data.contentLocale === 'fa' || data.contentLocale === 'en') return data.contentLocale

  const sample = `${data.personalInfo?.fullName ?? ''}\n${data.summary ?? ''}`
  if (PERSIAN_SCRIPT.test(sample)) return 'fa'
  if (LATIN_SCRIPT.test(sample)) return 'en'
  return 'fa'
}
