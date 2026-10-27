'use client'

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'

import { AppHeader } from '@/components/layout/app-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PersonalInfoSection } from '@/components/editor/form-builder/personal-info-section'
import { SummarySection } from '@/components/editor/form-builder/summary-section'
import { ExperienceSection } from '@/components/editor/form-builder/experience-section'
import { EducationSection } from '@/components/editor/form-builder/education-section'
import { SkillsSection } from '@/components/editor/form-builder/skills-section'
import { ResumePreview } from '@/components/editor/preview/resume-preview'
import { ExportMenu } from '@/components/editor/export-menu'
import { ATSCheckerPanel } from '@/components/ai/ats-checker-panel'
import { JobMatchPanel } from '@/components/ai/job-match-panel'
import { TranslateDialog } from '@/components/ai/translate-dialog'
import { useLocale } from '@/hooks/use-locale'
import type { AppLocale } from '@/lib/i18n/locale'
import { useResumeStore } from '@/stores/resume-store'
import { resumeDataSchema } from '@/schemas/resume.schema'
import type { ResumeData, TemplateType, FontSizeType } from '@/types/resume.types'

interface EditorPageClientProps {
  resumeId: string
}

export function EditorPageClient({ resumeId }: EditorPageClientProps) {
  const router = useRouter()
  const previewRef = useRef<HTMLDivElement>(null)
  const { resumes, updateResume, isHydrated } = useResumeStore()
  const { t, dir } = useLocale()

  const resume = useMemo(() => resumes.find(r => r.id === resumeId), [resumes, resumeId])

  const methods = useForm<ResumeData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(resumeDataSchema) as any,
    defaultValues: resume || undefined,
    mode: 'onChange'
  })

  const { watch, reset, setValue } = methods
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedData = watch()

  useEffect(() => {
    if (resume && isHydrated) {
      reset(resume)
    }
  }, [resume?.id, isHydrated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isHydrated || !resume) return

    const timeout = setTimeout(() => {
      updateResume(resumeId, watchedData)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [JSON.stringify(watchedData)]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = useCallback(() => {
    updateResume(resumeId, watchedData)
    toast.success(t('editor.saved'))
  }, [updateResume, resumeId, watchedData, t])

  const handleTemplateChange = useCallback(
    (template: TemplateType) => {
      setValue('template', template, { shouldDirty: true })
    },
    [setValue]
  )

  const handleFontFamilyChange = useCallback(
    (fontFamily: string) => {
      setValue('fontFamily', fontFamily, { shouldDirty: true })
    },
    [setValue]
  )

  const handleFontSizeChange = useCallback(
    (fontSize: FontSizeType) => {
      setValue('fontSize', fontSize, { shouldDirty: true })
    },
    [setValue]
  )

  const handleContentLocaleChange = useCallback(
    (locale: AppLocale) => {
      setValue('contentLocale', locale, { shouldDirty: true })
      const currentFont = watchedData.fontFamily
      if (locale === 'fa' && (!currentFont || currentFont === 'Inter')) {
        setValue('fontFamily', 'Vazirmatn', { shouldDirty: true })
      }
      if (locale === 'en' && (!currentFont || currentFont === 'Vazirmatn')) {
        setValue('fontFamily', 'Inter', { shouldDirty: true })
      }
    },
    [setValue, watchedData.fontFamily]
  )

  if (!isHydrated) {
    return (
      <div className='flex min-h-screen flex-col'>
        <AppHeader />
        <div className='flex-1 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            <p className='text-sm text-muted-foreground'>{t('editor.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className='flex min-h-screen flex-col'>
        <AppHeader />
        <div className='flex-1 flex flex-col items-center justify-center gap-4'>
          <p className='text-lg text-muted-foreground'>{t('editor.notFound')}</p>
          <Button onClick={() => router.push('/')} variant='outline' className='gap-2'>
            <ArrowLeft className='h-4 w-4 rtl:-scale-x-100' />
            {t('editor.backToDashboard')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-screen flex-col'>
        <AppHeader />

        <div
          dir={dir}
          className='flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2'
        >
          <div className='flex min-w-0 items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.push('/')} className='gap-1.5'>
              <ArrowLeft className='h-3.5 w-3.5 rtl:-scale-x-100' />
              {t('common.back')}
            </Button>
            <div className='h-5 w-px shrink-0 bg-border' />
            <Input
              dir={dir}
              className='h-8 w-40 text-start text-sm font-medium border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:bg-muted/50 rounded px-2 sm:w-62.5'
              value={watchedData.title ?? ''}
              onChange={e => setValue('title', e.target.value)}
              placeholder={t('editor.titlePlaceholder')}
            />
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <ATSCheckerPanel />
            <JobMatchPanel />
            <TranslateDialog />

            <Separator orientation='vertical' className='h-5' />

            <ExportMenu previewRef={previewRef} data={watchedData} />

            <Button size='sm' onClick={handleSave} className='gap-1.5'>
              <Save className='h-3.5 w-3.5' />
              {t('common.save')}
            </Button>
          </div>
        </div>

        <div
          dir={dir}
          className='flex min-h-0 flex-1 flex-col lg:h-[calc(100dvh-6.75rem)] lg:flex-row lg:overflow-hidden'
        >
          <div className='flex w-full flex-col border-b border-border bg-background lg:w-105 lg:min-w-95 lg:border-b-0 lg:border-e lg:overflow-hidden'>
            <ScrollArea dir={dir} className='lg:min-h-0 lg:flex-1'>
              <div className='p-4'>
                <Accordion
                  type='multiple'
                  defaultValue={['personal-info', 'summary', 'experience', 'education', 'skills']}
                >
                  <AccordionItem value='personal-info'>
                    <AccordionTrigger className='text-sm font-semibold'>👤 {t('sections.personal')}</AccordionTrigger>
                    <AccordionContent>
                      <PersonalInfoSection />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value='summary'>
                    <AccordionTrigger className='text-sm font-semibold'>📝 {t('sections.summary')}</AccordionTrigger>
                    <AccordionContent>
                      <SummarySection />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value='experience'>
                    <AccordionTrigger className='text-sm font-semibold'>💼 {t('sections.experience')}</AccordionTrigger>
                    <AccordionContent>
                      <ExperienceSection />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value='education'>
                    <AccordionTrigger className='text-sm font-semibold'>🎓 {t('sections.education')}</AccordionTrigger>
                    <AccordionContent>
                      <EducationSection />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value='skills'>
                    <AccordionTrigger className='text-sm font-semibold'>🛠️ {t('sections.skills')}</AccordionTrigger>
                    <AccordionContent>
                      <SkillsSection />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollArea>
          </div>

          <div className='min-h-[70vh] min-w-0 flex-1 lg:min-h-0'>
            <ResumePreview
              previewRef={previewRef}
              data={watchedData}
              template={watchedData.template || 'modern'}
              onTemplateChange={handleTemplateChange}
              onFontFamilyChange={handleFontFamilyChange}
              onFontSizeChange={handleFontSizeChange}
              onContentLocaleChange={handleContentLocaleChange}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
