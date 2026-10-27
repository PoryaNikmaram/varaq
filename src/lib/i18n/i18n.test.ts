import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { resolveContentLocale } from './content-locale.ts'
import { dictionaryKeys, translate } from './index.ts'
import { directionFor, documentLang, formatNumber } from './locale.ts'
import { localizePrompt } from '../ai/prompts.ts'

describe('dictionaries', () => {
  it('gives Persian and English the same keys', () => {
    assert.deepEqual(dictionaryKeys('fa'), dictionaryKeys('en'))
  })

  it('translates and interpolates', () => {
    assert.equal(translate('fa', 'dashboard.newResume'), 'رزومه جدید')
    assert.equal(translate('en', 'dashboard.countMany', { count: 3 }), '3 resumes')
    assert.equal(translate('fa', 'missing.key'), 'missing.key')
  })
})

describe('direction', () => {
  it('maps Persian to RTL and English to LTR', () => {
    assert.equal(directionFor('fa'), 'rtl')
    assert.equal(directionFor('en'), 'ltr')
    assert.equal(documentLang('fa'), 'fa-IR')
    assert.equal(documentLang('en'), 'en')
  })

  it('formats numbers for the active locale', () => {
    assert.equal(formatNumber(12, 'fa'), new Intl.NumberFormat('fa-IR').format(12))
    assert.equal(formatNumber(12, 'en'), '12')
  })
})

describe('resume content language', () => {
  it('prefers an explicit choice over the text script', () => {
    assert.equal(resolveContentLocale({ contentLocale: 'en', summary: 'توسعه‌دهنده' }), 'en')
  })

  it('detects Persian and English text when no choice is stored', () => {
    assert.equal(resolveContentLocale({ summary: 'توسعه‌دهنده فرانت‌اند' }), 'fa')
    assert.equal(resolveContentLocale({ personalInfo: { fullName: 'Sara Ahmadi' } }), 'en')
    assert.equal(resolveContentLocale({}), 'fa')
  })
})

describe('AI language instruction', () => {
  it('asks for Persian prose without translating JSON keys', () => {
    const prompt = localizePrompt('Return JSON.', 'Enhance this.', 'fa')
    assert.match(prompt.system, /Persian \(Farsi\)/)
    assert.match(prompt.system, /Do not translate JSON keys/)
    assert.match(prompt.user, /^Respond in Persian/)
  })

  it('asks for English when English is selected', () => {
    const prompt = localizePrompt('Return JSON.', 'Enhance this.', 'en')
    assert.match(prompt.user, /^Respond in English/)
    assert.doesNotMatch(prompt.system, /Persian \(Farsi\)/)
  })
})
