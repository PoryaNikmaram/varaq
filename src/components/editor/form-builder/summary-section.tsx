'use client'

import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EnhanceButton } from '@/components/ai/enhance-button'
import { MicButton } from '@/components/ui/mic-button'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useLocale } from '@/hooks/use-locale'
import { directionFor, speechLang } from '@/lib/i18n/locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import type { ResumeData } from '@/types/resume.types'

export function SummarySection() {
  const { register, watch, setValue } = useFormContext<ResumeData>()
  const { t } = useLocale()
  const contentLocale = useContentLanguage()
  const textDir = directionFor(contentLocale)
  const summary = watch('summary') || ''

  const handleVoice = useCallback(
    (text: string) => {
      setValue('summary', summary + (summary ? ' ' : '') + text)
    },
    [summary, setValue]
  )

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <Label htmlFor='summary' className='text-xs'>
          {t('summary.label')}
        </Label>
        <div className='flex items-center gap-1'>
          <MicButton onTranscript={handleVoice} lang={speechLang(contentLocale)} />
          <EnhanceButton value={summary} onApply={val => setValue('summary', val)} />
          <span className='text-[11px] text-muted-foreground'>{summary.length}/2000</span>
        </div>
      </div>
      <Textarea
        id='summary'
        dir={textDir}
        placeholder={resumeCopy[contentLocale].placeholders.summary}
        className='min-h-30 text-sm leading-relaxed'
        maxLength={2000}
        {...register('summary')}
      />
      <p className='text-[11px] text-muted-foreground'>
        {t('summary.tip')}
      </p>
    </div>
  )
}
