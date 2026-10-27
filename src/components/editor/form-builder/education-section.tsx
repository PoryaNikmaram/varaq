'use client'

import React, { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { GripVertical, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useLocale } from '@/hooks/use-locale'
import { formatNumber } from '@/lib/i18n'
import { directionFor } from '@/lib/i18n/locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import type { ResumeData } from '@/types/resume.types'

export function EducationSection() {
  const { control } = useFormContext<ResumeData>()
  const { t } = useLocale()
  const { fields, append, remove } = useFieldArray({ control, name: 'education' })

  const handleAdd = useCallback(() => {
    append({
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    })
  }, [append])

  return (
    <div className='space-y-4'>
      {fields.length === 0 && <p className='text-sm text-muted-foreground text-center py-4'>{t('education.empty')}</p>}

      {fields.map((field, index) => (
        <EducationItem key={field.id} index={index} onRemove={() => remove(index)} />
      ))}

      <Button type='button' variant='outline' size='sm' onClick={handleAdd} className='w-full gap-1.5'>
        <Plus className='h-3.5 w-3.5' />
        {t('education.add')}
      </Button>
    </div>
  )
}

function EducationItem({ index, onRemove }: { index: number; onRemove: () => void }) {
  const { register } = useFormContext<ResumeData>()
  const { t, locale } = useLocale()
  const contentLocale = useContentLanguage()
  const textDir = directionFor(contentLocale)
  const placeholders = resumeCopy[contentLocale].placeholders

  return (
    <div className='rounded-lg border border-border bg-muted/20 p-3 space-y-3 relative group'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
          <GripVertical className='h-3.5 w-3.5 cursor-grab' />
          <span>{t('education.item', { n: formatNumber(index + 1, locale) })}</span>
        </div>
        <Button type='button' variant='ghost' size='icon' className='h-6 w-6' onClick={onRemove}>
          <Trash2 className='h-3.5 w-3.5 text-destructive' />
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.institution')} *</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.institution} {...register(`education.${index}.institution`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.degree')} *</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.degree} {...register(`education.${index}.degree`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.field')}</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.field} {...register(`education.${index}.field`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.gpa')}</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.gpa} {...register(`education.${index}.gpa`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.startDate')} *</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.eduStart} {...register(`education.${index}.startDate`)} />
        </div>
        <div className='space-y-1'>
          <Label className='text-[11px]'>{t('education.endDate')}</Label>
          <Input dir={textDir} className='h-7 text-xs' placeholder={placeholders.eduEnd} {...register(`education.${index}.endDate`)} />
        </div>
      </div>

      <div className='space-y-1'>
        <Label className='text-[11px]'>{t('education.description')}</Label>
        <Textarea
          dir={textDir}
          className='min-h-15 text-xs'
          placeholder={placeholders.eduDescription}
          {...register(`education.${index}.description`)}
        />
      </div>
    </div>
  )
}
