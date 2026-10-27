'use client'

import { useFormContext } from 'react-hook-form'

import { resolveContentLocale } from '@/lib/i18n/content-locale'
import type { AppLocale } from '@/lib/i18n/locale'
import type { ResumeData } from '@/types/resume.types'

export function useContentLanguage(): AppLocale {
  const { watch } = useFormContext<ResumeData>()
  return resolveContentLocale({
    contentLocale: watch('contentLocale'),
    personalInfo: watch('personalInfo'),
    summary: watch('summary')
  })
}
