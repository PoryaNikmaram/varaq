import { z } from 'zod/v4'

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'validation.fullName').max(100),
  email: z.email('validation.email').optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  website: z.url('validation.url').optional().or(z.literal('')),
  linkedin: z.string().max(200).optional().or(z.literal('')),
  title: z.string().max(100).optional().or(z.literal(''))
})

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'validation.company').max(100),
  position: z.string().min(1, 'validation.position').max(100),
  location: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().min(1, 'validation.startDate'),
  endDate: z.string().optional().or(z.literal('')),
  isCurrentRole: z.boolean().default(false),
  bullets: z.array(z.string().max(500)).max(8).default([])
})

export const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'validation.institution').max(100),
  degree: z.string().min(1, 'validation.degree').max(100),
  field: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().min(1, 'validation.startDate'),
  endDate: z.string().optional().or(z.literal('')),
  gpa: z.string().max(10).optional().or(z.literal('')),
  description: z.string().max(500).optional().or(z.literal(''))
})

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'validation.skill').max(50),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional()
})

export const FONT_FAMILIES = [
  'Vazirmatn',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Nunito',
  'Raleway',
  'Source Sans 3',
  'PT Sans',
  'Merriweather',
  'Playfair Display',
  'Lora',
  'Georgia',
  'Times New Roman'
] as const

export const FONT_SIZES = [
  { value: 'xs', label: 'Extra Small', basePx: 8 },
  { value: 'sm', label: 'Small', basePx: 9 },
  { value: 'md', label: 'Medium', basePx: 10 },
  { value: 'lg', label: 'Large', basePx: 11 },
  { value: 'xl', label: 'Extra Large', basePx: 12 }
] as const

export const resumeDataSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'validation.title').max(100).default('Untitled Resume'),
  template: z.enum(['modern', 'minimalist', 'professional']).default('modern'),
  contentLocale: z.enum(['fa', 'en']).optional(),
  fontFamily: z.string().default('Inter'),
  fontSize: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).default('sm'),
  personalInfo: personalInfoSchema,
  summary: z.string().max(2000).optional().or(z.literal('')),
  experience: z.array(experienceItemSchema).max(10).default([]),
  education: z.array(educationItemSchema).max(5).default([]),
  skills: z.array(skillItemSchema).max(20).default([]),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const settingsSchema = z.object({
  apiKey: z.string().optional().or(z.literal('')),
  apiProvider: z.enum(['openai', 'gemini']).default('openai'),
  selectedTemplate: z.enum(['modern', 'minimalist', 'professional']).default('modern'),
  locale: z.enum(['fa', 'en']).default('fa')
})
