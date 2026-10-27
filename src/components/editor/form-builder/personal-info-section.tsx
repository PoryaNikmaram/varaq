'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Briefcase, Globe, Mail, MapPin, Phone, User } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useLocale } from '@/hooks/use-locale'
import { directionFor } from '@/lib/i18n/locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import type { ResumeData } from '@/types/resume.types'

export function PersonalInfoSection() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ResumeData>()
  const { t } = useLocale()
  const contentLocale = useContentLanguage()
  const textDir = directionFor(contentLocale)
  const placeholders = resumeCopy[contentLocale].placeholders

  const fields = [
    {
      name: 'personalInfo.fullName' as const,
      label: t('personal.fullName'),
      placeholder: placeholders.fullName,
      icon: User,
      required: true,
      dir: textDir
    },
    {
      name: 'personalInfo.title' as const,
      label: t('personal.jobTitle'),
      placeholder: placeholders.jobTitle,
      icon: Briefcase,
      dir: textDir
    },
    {
      name: 'personalInfo.email' as const,
      label: t('personal.email'),
      placeholder: placeholders.email,
      icon: Mail,
      type: 'email',
      dir: 'ltr' as const
    },
    {
      name: 'personalInfo.phone' as const,
      label: t('personal.phone'),
      placeholder: placeholders.phone,
      icon: Phone,
      type: 'tel',
      dir: 'ltr' as const
    },
    {
      name: 'personalInfo.location' as const,
      label: t('personal.location'),
      placeholder: placeholders.location,
      icon: MapPin,
      dir: textDir
    },
    {
      name: 'personalInfo.website' as const,
      label: t('personal.website'),
      placeholder: placeholders.website,
      icon: Globe,
      type: 'url',
      dir: 'ltr' as const
    },
    {
      name: 'personalInfo.linkedin' as const,
      label: t('personal.linkedin'),
      placeholder: placeholders.linkedin,
      icon: Globe,
      dir: 'ltr' as const
    }
  ]

  return (
    <div className='space-y-3'>
      {fields.map(field => {
        const Icon = field.icon
        const fieldPath = field.name.split('.') as [keyof ResumeData, string]
        const error = (errors as Record<string, Record<string, { message?: string }>>)[fieldPath[0]]?.[fieldPath[1]]

        return (
          <div key={field.name} className='space-y-1'>
            <Label htmlFor={field.name} className='text-xs flex items-center gap-1.5'>
              <Icon className='h-3 w-3 text-muted-foreground' />
              {field.label}
              {field.required && <span className='text-destructive'>*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type || 'text'}
              dir={field.dir}
              placeholder={field.placeholder}
              className='h-8 text-sm'
              {...register(field.name)}
            />
            {error?.message && <p className='text-[11px] text-destructive'>{t(error.message)}</p>}
          </div>
        )
      })}
    </div>
  )
}
