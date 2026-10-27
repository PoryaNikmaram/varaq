import type { ResumeData } from '@/types/resume.types'
import { resolveContentLocale } from '@/lib/i18n/content-locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import { directionFor, type AppLocale } from '@/lib/i18n/locale'

export function getResumePresentation(data: {
  contentLocale?: string | null
  fontFamily?: string | null
  personalInfo?: { fullName?: string | null }
  summary?: string | null
}): { locale: AppLocale; dir: 'rtl' | 'ltr'; rtl: boolean; fontStack: string; copy: (typeof resumeCopy)[AppLocale] } {
  const locale = resolveContentLocale(data)
  const fontStack = resumeFontStack(data.fontFamily, locale)

  return {
    locale,
    dir: directionFor(locale),
    rtl: locale === 'fa',
    fontStack,
    copy: resumeCopy[locale]
  }
}

export function resumeFontStack(fontFamily?: string | null, locale: AppLocale = 'fa'): string {
  if (!fontFamily || fontFamily === 'Vazirmatn') return 'var(--font-vazirmatn), sans-serif'
  if (fontFamily === 'Inter') return 'var(--font-inter), sans-serif'

  const fallback = locale === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-inter)'
  return `'${fontFamily}', ${fallback}, sans-serif`
}

const emptyPersonal = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  title: ''
}

export function resumeSections(data: Partial<ResumeData>) {
  return {
    personalInfo: data.personalInfo ?? emptyPersonal,
    summary: data.summary ?? '',
    experience: data.experience ?? [],
    education: data.education ?? [],
    skills: data.skills ?? []
  }
}
