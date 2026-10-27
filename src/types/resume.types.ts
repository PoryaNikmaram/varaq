import type { z } from 'zod/v4'

import type { AppLocale } from '@/lib/i18n/locale'
import type {
  educationItemSchema,
  experienceItemSchema,
  personalInfoSchema,
  resumeDataSchema,
  settingsSchema,
  skillItemSchema
} from '@/schemas/resume.schema'

export type PersonalInfoData = z.infer<typeof personalInfoSchema>
export type ExperienceItemData = z.infer<typeof experienceItemSchema>
export type EducationItemData = z.infer<typeof educationItemSchema>
export type SkillItemData = z.infer<typeof skillItemSchema>
export type ResumeData = z.infer<typeof resumeDataSchema>
export type SettingsData = z.infer<typeof settingsSchema>

export type TemplateType = 'modern' | 'minimalist' | 'professional'
export type ApiProviderType = 'openai' | 'gemini'
export type { AppLocale }
export type SkillLevelType = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type FontSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ResumeStoreState {
  resumes: ResumeData[]
  activeResumeId: string | null
  isHydrated: boolean
}

export interface ResumeStoreActions {
  setResumes: (resumes: ResumeData[]) => void
  addResume: (resume: ResumeData) => void
  updateResume: (id: string, data: Partial<ResumeData>) => void
  deleteResume: (id: string) => void
  duplicateResume: (id: string, copyLabel?: string) => ResumeData | null
  setActiveResumeId: (id: string | null) => void
  getActiveResume: () => ResumeData | undefined
  hydrate: () => Promise<void>
}

export interface SettingsStoreState {
  apiKey: string
  apiProvider: ApiProviderType
  selectedTemplate: TemplateType
  locale: AppLocale
  isSettingsOpen: boolean
  isHydrated: boolean
}

export interface SettingsStoreActions {
  setApiKey: (key: string) => void
  setApiProvider: (provider: ApiProviderType) => void
  setSelectedTemplate: (template: TemplateType) => void
  setLocale: (locale: AppLocale) => void
  setIsSettingsOpen: (open: boolean) => void
  hasApiKey: () => boolean
  hydrate: () => Promise<void>
}
