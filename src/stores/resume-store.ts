'use client'

import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'

import { STORAGE_KEYS } from '@/lib/constants'
import type { AppLocale } from '@/lib/i18n/locale'
import { getStorageItem, setStorageItem } from '@/lib/storage'
import type { ResumeData, ResumeStoreActions, ResumeStoreState } from '@/types/resume.types'

function createEmptyResume(title = 'Untitled Resume', locale: AppLocale = 'fa'): ResumeData {
  const now = new Date().toISOString()
  return {
    id: uuidv4(),
    title,
    template: 'modern',
    contentLocale: locale,
    fontFamily: locale === 'fa' ? 'Vazirmatn' : 'Inter',
    fontSize: 'sm',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      title: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    createdAt: now,
    updatedAt: now
  }
}

export const useResumeStore = create<ResumeStoreState & ResumeStoreActions>((set, get) => ({
  resumes: [],
  activeResumeId: null,
  isHydrated: false,

  setResumes: resumes => {
    set({ resumes })
    setStorageItem(STORAGE_KEYS.RESUMES, resumes).catch(console.error)
  },

  addResume: resume => {
    const updated = [...get().resumes, resume]
    set({ resumes: updated })
    setStorageItem(STORAGE_KEYS.RESUMES, updated).catch(console.error)
  },

  updateResume: (id, data) => {
    const updated = get().resumes.map(r => (r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r))
    set({ resumes: updated })
    setStorageItem(STORAGE_KEYS.RESUMES, updated).catch(console.error)
  },

  deleteResume: id => {
    const updated = get().resumes.filter(r => r.id !== id)
    set({ resumes: updated, activeResumeId: get().activeResumeId === id ? null : get().activeResumeId })
    setStorageItem(STORAGE_KEYS.RESUMES, updated).catch(console.error)
  },

  duplicateResume: (id, copyLabel = 'Copy') => {
    const source = get().resumes.find(r => r.id === id)
    if (!source) return null
    const now = new Date().toISOString()
    const duplicate: ResumeData = {
      ...structuredClone(source),
      id: uuidv4(),
      title: `${source.title} (${copyLabel})`,
      createdAt: now,
      updatedAt: now
    }
    const updated = [...get().resumes, duplicate]
    set({ resumes: updated })
    setStorageItem(STORAGE_KEYS.RESUMES, updated).catch(console.error)
    return duplicate
  },

  setActiveResumeId: id => {
    set({ activeResumeId: id })
  },

  getActiveResume: () => {
    const { resumes, activeResumeId } = get()
    return resumes.find(r => r.id === activeResumeId)
  },

  hydrate: async () => {
    try {
      const stored = await getStorageItem<ResumeData[]>(STORAGE_KEYS.RESUMES)
      if (stored && Array.isArray(stored)) {
        set({ resumes: stored, isHydrated: true })
      } else {
        set({ isHydrated: true })
      }
    } catch (error) {
      console.error('[ResumeStore] Hydration error:', error)
      set({ isHydrated: true })
    }
  }
}))

export { createEmptyResume }
