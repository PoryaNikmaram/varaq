'use client'

import { useCallback } from 'react'

import { directionFor, translate, type TranslationVars } from '@/lib/i18n'
import { useSettingsStore } from '@/stores/settings-store'

export function useLocale() {
  const locale = useSettingsStore(s => s.locale)
  const setLocale = useSettingsStore(s => s.setLocale)

  const t = useCallback((path: string, vars?: TranslationVars) => translate(locale, path, vars), [locale])

  return {
    locale,
    setLocale,
    dir: directionFor(locale),
    t
  }
}
