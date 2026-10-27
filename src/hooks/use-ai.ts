'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { callAI } from '@/lib/ai/ai-client'
import { localizeAiError, parseAiJson } from '@/lib/ai/errors'
import {
  ATS_CHECKER_PROMPT,
  ENHANCE_CONTENT_PROMPT,
  JOB_MATCH_PROMPT,
  TRANSLATE_PROMPT,
  localizePrompt,
  type OutputLanguage
} from '@/lib/ai/prompts'
import { translate, type AppLocale } from '@/lib/i18n'
import { useSettingsStore } from '@/stores/settings-store'

function reportAiError(error: Error, locale: AppLocale, fallback: string) {
  toast.error(error.message ? localizeAiError(error.message, locale) : translate(locale, fallback))
}

function useAIConfig() {
  const apiKey = useSettingsStore(s => s.apiKey)
  const apiProvider = useSettingsStore(s => s.apiProvider)
  return { apiKey, apiProvider }
}

export function useEnhanceContent() {
  const { apiKey, apiProvider } = useAIConfig()
  const locale = useSettingsStore(s => s.locale)

  return useMutation({
    mutationKey: ['ai', 'enhance'],
    mutationFn: async ({ text, language }: { text: string; language: OutputLanguage }) => {
      if (!apiKey) throw new Error('API_KEY_REQUIRED')
      const prompt = localizePrompt(ENHANCE_CONTENT_PROMPT.system, ENHANCE_CONTENT_PROMPT.user(text), language)
      const res = await callAI(apiProvider, apiKey, [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user }
      ])
      return res.text
    },
    onError: (err: Error) => reportAiError(err, locale, 'ai.errors.enhance')
  })
}

export interface ATSCategory {
  score: number
  feedback: string
}

export interface ATSSuggestion {
  priority: 'high' | 'medium' | 'low'
  text: string
}

export interface ATSResult {
  score: number
  categories: Record<string, ATSCategory>
  suggestions: ATSSuggestion[]
}

export function useATSCheck() {
  const { apiKey, apiProvider } = useAIConfig()
  const locale = useSettingsStore(s => s.locale)

  return useMutation({
    mutationKey: ['ai', 'ats-check'],
    mutationFn: async ({
      resumeJson,
      language
    }: {
      resumeJson: string
      language: OutputLanguage
    }): Promise<ATSResult> => {
      if (!apiKey) throw new Error('API_KEY_REQUIRED')
      const prompt = localizePrompt(ATS_CHECKER_PROMPT.system, ATS_CHECKER_PROMPT.user(resumeJson), language)
      const res = await callAI(
        apiProvider,
        apiKey,
        [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user }
        ],
        { temperature: 0.3, maxTokens: 4096 }
      )
      return parseAiJson<ATSResult>(res.text)
    },
    onError: (err: Error) => reportAiError(err, locale, 'ai.errors.ats')
  })
}

export interface JobMatchSuggestion {
  section: string
  action: string
  current: string
  suggested: string
  reason: string
}

export interface JobMatchResult {
  matchScore: number
  missingKeywords: string[]
  suggestions: JobMatchSuggestion[]
}

export function useJobMatch() {
  const { apiKey, apiProvider } = useAIConfig()
  const locale = useSettingsStore(s => s.locale)

  return useMutation({
    mutationKey: ['ai', 'job-match'],
    mutationFn: async ({
      resumeJson,
      jobDescription,
      language
    }: {
      resumeJson: string
      jobDescription: string
      language: OutputLanguage
    }): Promise<JobMatchResult> => {
      if (!apiKey) throw new Error('API_KEY_REQUIRED')
      const prompt = localizePrompt(
        JOB_MATCH_PROMPT.system,
        JOB_MATCH_PROMPT.user(resumeJson, jobDescription),
        language
      )
      const res = await callAI(
        apiProvider,
        apiKey,
        [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user }
        ],
        { temperature: 0.3, maxTokens: 4096 }
      )
      return parseAiJson<JobMatchResult>(res.text)
    },
    onError: (err: Error) => reportAiError(err, locale, 'ai.errors.match')
  })
}

export interface TranslatedResume {
  personalInfo?: { fullName?: string; title?: string }
  summary?: string
  experience?: Array<{ position?: string; company?: string; location?: string; bullets?: string[] }>
  education?: Array<{ degree?: string; field?: string; institution?: string; description?: string }>
  skills?: Array<{ name?: string }>
}

export function useTranslate() {
  const { apiKey, apiProvider } = useAIConfig()
  const locale = useSettingsStore(s => s.locale)

  return useMutation({
    mutationKey: ['ai', 'translate'],
    mutationFn: async ({ resumeJson, targetLanguage }: { resumeJson: string; targetLanguage: string }) => {
      if (!apiKey) throw new Error('API_KEY_REQUIRED')
      const res = await callAI(
        apiProvider,
        apiKey,
        [
          { role: 'system', content: TRANSLATE_PROMPT.system },
          { role: 'user', content: TRANSLATE_PROMPT.user(resumeJson, targetLanguage) }
        ],
        { temperature: 0.3, maxTokens: 4096 }
      )
      return parseAiJson<TranslatedResume>(res.text)
    },
    onError: (err: Error) => reportAiError(err, locale, 'ai.errors.translate')
  })
}
