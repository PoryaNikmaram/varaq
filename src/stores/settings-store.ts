'use client'

import { create } from 'zustand'

import { STORAGE_KEYS } from '@/lib/constants'
import { applyDocumentLocale, type AppLocale } from '@/lib/i18n/locale'
import type { ApiProviderType, SettingsStoreActions, SettingsStoreState, TemplateType } from '@/types/resume.types'

const SETTINGS_KEY = STORAGE_KEYS.SETTINGS

function getLocalSettings(): Partial<SettingsStoreState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalSettings(state: Partial<SettingsStoreState>) {
  if (typeof window === 'undefined') return
  try {
    const existing = getLocalSettings()
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...existing, ...state }))
  } catch (error) {
    console.error('[SettingsStore] Save error:', error)
  }
}

export const useSettingsStore = create<SettingsStoreState & SettingsStoreActions>((set, get) => ({
  apiKey: '',
  apiProvider: 'openai',
  selectedTemplate: 'modern',
  locale: 'fa',
  isSettingsOpen: false,
  isHydrated: false,

  setApiKey: apiKey => {
    set({ apiKey })
    saveLocalSettings({ apiKey })
  },

  setApiProvider: apiProvider => {
    set({ apiProvider })
    saveLocalSettings({ apiProvider })
  },

  setSelectedTemplate: selectedTemplate => {
    set({ selectedTemplate })
    saveLocalSettings({ selectedTemplate })
  },

  setLocale: locale => {
    set({ locale })
    saveLocalSettings({ locale })
    applyDocumentLocale(locale)
  },

  setIsSettingsOpen: isSettingsOpen => {
    set({ isSettingsOpen })
  },

  hasApiKey: () => {
    return get().apiKey.trim().length > 0
  },

  hydrate: async () => {
    const stored = getLocalSettings()
    const locale: AppLocale = stored.locale === 'en' ? 'en' : 'fa'
    set({
      apiKey: (stored.apiKey as string) || '',
      apiProvider: (stored.apiProvider as ApiProviderType) || 'openai',
      selectedTemplate: (stored.selectedTemplate as TemplateType) || 'modern',
      locale,
      isHydrated: true
    })
    applyDocumentLocale(locale)
  }
}))
