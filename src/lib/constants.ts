export const APP_NAME = 'Varaq'
export const APP_DESCRIPTION = 'Bilingual resume builder'

export const STORAGE_KEYS = {
  RESUMES: 'auto-resume:resumes',
  SETTINGS: 'auto-resume:settings',
  ACTIVE_RESUME: 'auto-resume:active-resume'
} as const

export const API_PROVIDERS = {
  OPENAI: 'openai',
  GEMINI: 'gemini'
} as const

export const TEMPLATE_OPTIONS = {
  MODERN: 'modern',
  MINIMALIST: 'minimalist',
  PROFESSIONAL: 'professional'
} as const

export const MAX_SKILLS = 20
export const MAX_EXPERIENCE_ITEMS = 10
export const MAX_EDUCATION_ITEMS = 5
export const MAX_BULLET_POINTS = 8

export const A4_ASPECT_RATIO = 297 / 210
