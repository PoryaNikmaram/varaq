import { fa } from './fa.ts'
import { en } from './en.ts'
import type { AppLocale } from './locale.ts'

const dictionaries = { fa, en }

export type TranslationVars = Record<string, string | number>

export function translate(locale: AppLocale, path: string, vars?: TranslationVars): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, dictionaries[locale])

  if (typeof value !== 'string') return path
  if (!vars) return value

  return value.replace(/\{(\w+)\}/g, (_, key: string) => (key in vars ? String(vars[key]) : `{${key}}`))
}

export function dictionaryKeys(locale: AppLocale = 'en'): string[] {
  return flatten(dictionaries[locale])
}

function flatten(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix.slice(0, -1)]
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, child]) => flatten(child, `${prefix}${key}.`))
}

export { applyDocumentLocale, directionFor, documentLang, formatNumber, speechLang } from './locale.ts'
export type { AppLocale } from './locale.ts'
export { resolveContentLocale } from './content-locale.ts'
