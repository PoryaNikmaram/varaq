'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Copy, FileText, MoreVertical, Plus, Sparkles, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { toast } from 'sonner'

import { AppHeader } from '@/components/layout/app-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useLocale } from '@/hooks/use-locale'
import { formatNumber } from '@/lib/i18n'
import { createEmptyResume, useResumeStore } from '@/stores/resume-store'

import 'dayjs/locale/fa'

dayjs.extend(relativeTime)

export default function DashboardPage() {
  const router = useRouter()
  const { resumes, addResume, deleteResume, duplicateResume, isHydrated } = useResumeStore()
  const { t, locale } = useLocale()
  const timeLocale = locale === 'fa' ? 'fa' : 'en'

  const handleCreateNew = useCallback(() => {
    const newResume = createEmptyResume(t('dashboard.untitled'), locale)
    addResume(newResume)
    router.push(`/editor/${newResume.id}`)
  }, [addResume, locale, router, t])

  const handleDuplicate = useCallback(
    (id: string) => {
      const dup = duplicateResume(id, t('dashboard.copySuffix'))
      if (dup) {
        toast.success(t('dashboard.duplicated'), { description: t('dashboard.duplicatedDescription', { title: dup.title }) })
      }
    },
    [duplicateResume, t]
  )

  const handleDelete = useCallback(
    (id: string, title: string) => {
      deleteResume(id)
      toast.success(t('dashboard.deleted'), { description: t('dashboard.deletedDescription', { title }) })
    },
    [deleteResume, t]
  )

  const handleOpen = useCallback(
    (id: string) => {
      router.push(`/editor/${id}`)
    },
    [router]
  )

  if (!isHydrated) {
    return (
      <div className='flex min-h-screen flex-col'>
        <AppHeader />
        <main className='flex-1 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            <p className='text-sm text-muted-foreground'>{t('dashboard.loading')}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <AppHeader />

      <main className='flex-1 px-6 py-8 max-w-6xl mx-auto w-full'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>{t('dashboard.title')}</h1>
            <p className='text-muted-foreground mt-1'>
              {resumes.length === 0
                ? t('dashboard.emptyHint')
                : t(resumes.length === 1 ? 'dashboard.countOne' : 'dashboard.countMany', {
                    count: formatNumber(resumes.length, locale)
                  })}
            </p>
          </div>
          <Button onClick={handleCreateNew} size='lg' className='gap-2' id='create-resume-button'>
            <Plus className='h-4 w-4' />
            {t('dashboard.newResume')}
          </Button>
        </div>

        {resumes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center justify-center py-24'
          >
            <div className='relative mb-6'>
              <div className='h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center'>
                <FileText className='h-12 w-12 text-primary' />
              </div>
              <div className='absolute -top-2 -end-2 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center'>
                <Sparkles className='h-4 w-4 text-primary' />
              </div>
            </div>
            <h2 className='text-xl font-semibold mb-2'>{t('dashboard.noResumesTitle')}</h2>
            <p className='text-muted-foreground text-center max-w-sm mb-6 leading-relaxed'>{t('dashboard.noResumesBody')}</p>
            <Button onClick={handleCreateNew} size='lg' className='gap-2'>
              <Plus className='h-4 w-4' />
              {t('dashboard.createFirst')}
            </Button>
          </motion.div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <AnimatePresence mode='popLayout'>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div
                  className='group relative rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden'
                  onClick={() => handleOpen(resume.id)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') handleOpen(resume.id)
                  }}
                  id={`resume-card-${resume.id}`}
                >
                  <div className='aspect-210/297 w-full bg-linear-to-br from-muted/30 to-muted/10 p-6 flex flex-col items-center justify-center relative overflow-hidden'>
                    <div className='w-full max-w-40 space-y-2'>
                      <div className='h-3 w-3/4 rounded bg-muted-foreground/10 mx-auto' />
                      <div className='h-2 w-1/2 rounded bg-muted-foreground/10 mx-auto' />
                      <div className='h-px w-full bg-muted-foreground/10 my-2' />
                      <div className='space-y-1.5'>
                        <div className='h-2 w-full rounded bg-muted-foreground/8' />
                        <div className='h-2 w-5/6 rounded bg-muted-foreground/8' />
                        <div className='h-2 w-4/6 rounded bg-muted-foreground/8' />
                      </div>
                      <div className='h-px w-full bg-muted-foreground/10 my-2' />
                      <div className='space-y-1.5'>
                        <div className='h-2 w-full rounded bg-muted-foreground/8' />
                        <div className='h-2 w-3/4 rounded bg-muted-foreground/8' />
                      </div>
                    </div>

                    <div className='absolute top-3 end-3 px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary'>
                      {t(`preview.templates.${resume.template}`)}
                    </div>

                    <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  <div className='p-4 border-t border-border'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium truncate'>{resume.title}</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>
                          {t('dashboard.updated', {
                            name: resume.personalInfo.fullName || t('dashboard.noName'),
                            time: dayjs(resume.updatedAt).locale(timeLocale).fromNow()
                          })}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 shrink-0 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100'
                            aria-label={t('common.actions')}
                            onClick={e => e.stopPropagation()}
                          >
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={e => {
                              e.stopPropagation()
                              handleDuplicate(resume.id)
                            }}
                          >
                            <Copy className='h-4 w-4' />
                            {t('common.duplicate')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={e => {
                              e.stopPropagation()
                              handleDelete(resume.id, resume.title)
                            }}
                            className='text-destructive focus:text-destructive'
                          >
                            <Trash2 className='h-4 w-4' />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
