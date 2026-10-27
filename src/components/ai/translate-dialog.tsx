'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Languages, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useTranslate } from '@/hooks/use-ai'
import { useLocale } from '@/hooks/use-locale'
import { useSettingsStore } from '@/stores/settings-store'
import type { ResumeData } from '@/types/resume.types'

const LANGUAGES = [
  'Persian',
  'English',
  'Arabic',
  'French',
  'German',
  'Spanish',
  'Portuguese',
  'Chinese (Simplified)',
  'Japanese',
  'Korean',
  'Hindi',
  'Indonesian'
] as const

export function TranslateDialog() {
  const [open, setOpen] = useState(false)
  const contentLocale = useContentLanguage()
  const [targetLang, setTargetLang] = useState(contentLocale === 'fa' ? 'English' : 'Persian')
  const { watch, setValue } = useFormContext<ResumeData>()
  const hasApiKey = useSettingsStore(s => s.hasApiKey)
  const setSettingsOpen = useSettingsStore(s => s.setIsSettingsOpen)
  const mutation = useTranslate()
  const { t } = useLocale()

  const handleTranslate = async () => {
    if (!hasApiKey()) {
      toast.error(t('ai.keyMissing'))
      setSettingsOpen(true)
      return
    }

    const data = watch()
    const payload = {
      personalInfo: data.personalInfo,
      summary: data.summary,
      experience: data.experience.map(e => ({
        position: e.position,
        company: e.company,
        location: e.location,
        bullets: e.bullets
      })),
      education: data.education.map(e => ({
        degree: e.degree,
        field: e.field,
        institution: e.institution,
        description: e.description
      })),
      skills: data.skills.map(s => ({ name: s.name }))
    }

    let result
    try {
      result = await mutation.mutateAsync({
        resumeJson: JSON.stringify(payload, null, 2),
        targetLanguage: targetLang
      })
    } catch {
      return
    }

    if (result.personalInfo) {
      if (result.personalInfo.fullName) setValue('personalInfo.fullName', result.personalInfo.fullName)
      if (result.personalInfo.title) setValue('personalInfo.title', result.personalInfo.title)
    }
    if (result.summary) setValue('summary', result.summary)

    const translatedExperience = result?.experience
    if (translatedExperience) {
      const currentExp = watch('experience')
      const updatedExp = currentExp.map((exp: ResumeData['experience'][number], i: number) => {
        const translated = translatedExperience[i]
        if (!translated) return exp
        return {
          ...exp,
          position: translated.position || exp.position,
          company: translated.company || exp.company,
          location: translated.location || exp.location,
          bullets: translated.bullets || exp.bullets
        }
      })
      setValue('experience', updatedExp)
    }

    const translatedEducation = result?.education
    if (translatedEducation) {
      const currentEdu = watch('education')
      const updatedEdu = currentEdu.map((edu: ResumeData['education'][number], i: number) => {
        const translated = translatedEducation[i]
        if (!translated) return edu
        return {
          ...edu,
          degree: translated.degree || edu.degree,
          field: translated.field || edu.field,
          institution: translated.institution || edu.institution,
          description: translated.description || edu.description
        }
      })
      setValue('education', updatedEdu)
    }

    const translatedSkills = result?.skills
    if (translatedSkills) {
      const currentSkills = watch('skills')
      const updatedSkills = currentSkills.map((skill: ResumeData['skills'][number], i: number) => {
        const translated = translatedSkills[i]
        if (!translated) return skill
        return { ...skill, name: translated.name || skill.name }
      })
      setValue('skills', updatedSkills)
    }

    if (targetLang === 'Persian') {
      setValue('contentLocale', 'fa')
      if (!watch('fontFamily') || watch('fontFamily') === 'Inter') setValue('fontFamily', 'Vazirmatn')
    }
    if (targetLang === 'English') {
      setValue('contentLocale', 'en')
      if (watch('fontFamily') === 'Vazirmatn') setValue('fontFamily', 'Inter')
    }

    toast.success(t('ai.translateDone', { language: t(`ai.languages.${targetLang}`) }))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1.5'>
          <Languages className='h-3.5 w-3.5' />
          {t('ai.translateButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Languages className='h-5 w-5 text-violet-400' />
            {t('ai.translateTitle')}
          </DialogTitle>
          <DialogDescription>{t('ai.translateDescription')}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>{t('ai.translateTarget')}</label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang} value={lang}>
                    {t(`ai.languages.${lang}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className='text-xs text-muted-foreground'>
            {t('ai.translateNote')}
          </p>

          <Button onClick={handleTranslate} disabled={mutation.isPending} className='w-full gap-2'>
            {mutation.isPending ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                {t('ai.translateRunning')}
              </>
            ) : (
              <>
                <Languages className='h-4 w-4' />
                {t('ai.translateRun', { language: t(`ai.languages.${targetLang}`) })}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
