'use client'

import React, { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { GripVertical, Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EnhanceButton } from '@/components/ai/enhance-button'
import { MicButton } from '@/components/ui/mic-button'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useLocale } from '@/hooks/use-locale'
import { formatNumber, speechLang } from '@/lib/i18n'
import { directionFor } from '@/lib/i18n/locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import type { ResumeData } from '@/types/resume.types'

export function ExperienceSection() {
  const { control } = useFormContext<ResumeData>()
  const { t } = useLocale()
  const { fields, append, remove } = useFieldArray({ control, name: 'experience' })

  const handleAdd = useCallback(() => {
    append({
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      bullets: ['']
    })
  }, [append])

  return (
    <div className='space-y-4'>
      {fields.length === 0 && (
        <p className='text-sm text-muted-foreground text-center py-4'>
          {t('experience.empty')}
        </p>
      )}

      {fields.map((field, index) => (
        <ExperienceItem key={field.id} index={index} onRemove={() => remove(index)} />
      ))}

      <Button type='button' variant='outline' size='sm' onClick={handleAdd} className='w-full gap-1.5'>
        <Plus className='h-3.5 w-3.5' />
        {t('experience.add')}
      </Button>
    </div>
  )
}

function ExperienceItem({ index, onRemove }: { index: number; onRemove: () => void }) {
  const { register, control, watch, setValue } = useFormContext<ResumeData>()
  const { t, locale } = useLocale()
  const contentLocale = useContentLanguage()
  const textDir = directionFor(contentLocale)
  const placeholders = resumeCopy[contentLocale].placeholders
  useFieldArray({
    control,
    name: `experience.${index}.bullets` as never
  })

  const isCurrentRole = watch(`experience.${index}.isCurrentRole`)

  const handleVoiceBullet = useCallback(
    (text: string) => {
      const bullets = watch(`experience.${index}.bullets`) || []
      setValue(`experience.${index}.bullets`, [...bullets, text])
    },
    [watch, setValue, index]
  )

  return (
    <div className='rounded-lg border border-border bg-muted/20 p-3 space-y-3 relative group'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
          <GripVertical className='h-3.5 w-3.5 cursor-grab' />
          <span>{t('experience.item', { n: formatNumber(index + 1, locale) })}</span>
        </div>
        <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={onRemove} aria-label={t('common.delete')}>
          <Trash2 className='h-3.5 w-3.5 text-destructive' />
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('experience.position')} *</Label>
          <Input
            dir={textDir}
            className='h-7 text-xs'
            placeholder={placeholders.position}
            {...register(`experience.${index}.position`)}
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('experience.company')} *</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.company} {...register(`experience.${index}.company`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('experience.location')}</Label>
          <Input
            dir={textDir}
            className='h-7 text-xs'
            placeholder={placeholders.expLocation}
            {...register(`experience.${index}.location`)}
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('experience.startDate')} *</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.startDate} {...register(`experience.${index}.startDate`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('experience.endDate')}</Label>
          <Input
            dir={textDir}
            className='h-7 text-xs'
            placeholder={isCurrentRole ? resumeCopy[contentLocale].present : placeholders.endDate}
            disabled={isCurrentRole}
            {...register(`experience.${index}.endDate`)}
          />
        </div>
        <div className='flex items-end pb-0.5'>
          <label className='flex items-center gap-1.5 text-[11px] text-muted-foreground cursor-pointer'>
            <input
              type='checkbox'
              className='rounded border-input'
              {...register(`experience.${index}.isCurrentRole`)}
            />
            {t('experience.current')}
          </label>
        </div>
      </div>

      <div className='space-y-1.5'>
        <div className='flex items-center justify-between'>
          <Label className='text-[11px]'>{t('experience.achievements')}</Label>
          <MicButton onTranscript={handleVoiceBullet} lang={speechLang(contentLocale)} />
        </div>
        {watch(`experience.${index}.bullets`)?.map((_: string, bIdx: number) => (
          <div key={bIdx} className='flex items-center gap-1'>
            <span className='text-[10px] text-muted-foreground w-3'>&bull;</span>
            <Input
              className='h-7 text-xs flex-1'
              dir={textDir}
              placeholder={placeholders.bullet}
              {...register(`experience.${index}.bullets.${bIdx}`)}
            />
            <EnhanceButton
              value={watch(`experience.${index}.bullets.${bIdx}`) || ''}
              onApply={val => setValue(`experience.${index}.bullets.${bIdx}`, val)}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-6 w-6 shrink-0'
              aria-label={t('experience.removeBullet')}
              onClick={() => {
                const currentBullets = watch(`experience.${index}.bullets`) || []
                const newBullets = currentBullets.filter((_: string, i: number) => i !== bIdx)
                setValue(`experience.${index}.bullets`, newBullets)
              }}
            >
              <X className='h-3 w-3 text-muted-foreground' />
            </Button>
          </div>
        ))}
        {(watch(`experience.${index}.bullets`)?.length || 0) < 8 && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='h-6 text-[11px] text-muted-foreground gap-1 w-full'
            onClick={() => {
              const currentBullets = watch(`experience.${index}.bullets`) || []
              setValue(`experience.${index}.bullets`, [...currentBullets, ''])
            }}
          >
            <Plus className='h-3 w-3' />
            {t('experience.addBullet')}
          </Button>
        )}
      </div>
    </div>
  )
}
