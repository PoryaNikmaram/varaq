'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Crosshair, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useJobMatch, type JobMatchResult } from '@/hooks/use-ai'
import { useLocale } from '@/hooks/use-locale'
import { useSettingsStore } from '@/stores/settings-store'
import type { ResumeData } from '@/types/resume.types'

export function JobMatchPanel() {
  const [open, setOpen] = useState(false)
  const [jd, setJd] = useState('')
  const [result, setResult] = useState<JobMatchResult | null>(null)
  const { watch } = useFormContext<ResumeData>()
  const hasApiKey = useSettingsStore(s => s.hasApiKey)
  const setSettingsOpen = useSettingsStore(s => s.setIsSettingsOpen)
  const mutation = useJobMatch()
  const { t, dir } = useLocale()
  const language = useContentLanguage()

  const label = (group: 'categories' | 'actions', value: string) => {
    const path = `ai.${group}.${value}`
    const translated = t(path)
    return translated === path ? value : translated
  }

  const handleAnalyze = async () => {
    if (!hasApiKey()) {
      toast.error(t('ai.keyMissing'))
      setSettingsOpen(true)
      return
    }
    if (!jd.trim()) {
      toast.warning(t('ai.jobEmpty'))
      return
    }
    const data = watch()
    const resumeJson = JSON.stringify(data, null, 2)
    try {
      const res = await mutation.mutateAsync({ resumeJson, jobDescription: jd, language })
      setResult(res)
    } catch {
      return
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1.5'>
          <Crosshair className='h-3.5 w-3.5' />
          {t('ai.jobButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg max-h-[85vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Crosshair className='h-5 w-5 text-violet-400' />
            {t('ai.jobTitle')}
          </DialogTitle>
          <DialogDescription>{t('ai.jobDescription')}</DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className='space-y-3'>
            <Textarea
              dir={dir}
              placeholder={t('ai.jobPlaceholder')}
              className='min-h-40 text-sm'
              value={jd}
              onChange={e => setJd(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={mutation.isPending} className='w-full gap-2'>
              {mutation.isPending ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  {t('ai.jobRunning')}
                </>
              ) : (
                <>
                  <Crosshair className='h-4 w-4' />
                  {t('ai.jobRun')}
                </>
              )}
            </Button>
          </div>
        ) : (
          <ScrollArea className='flex-1 -mx-6 px-6'>
            <div className='space-y-4 pb-4'>
              <div className='rounded-lg border border-border p-4 text-center'>
                <div className={`text-4xl font-bold ${getScoreColor(result.matchScore)}`}>{result.matchScore}%</div>
                <div className='text-xs text-muted-foreground mt-1'>{t('ai.jobScore')}</div>
              </div>

              {result.missingKeywords.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-semibold'>{t('ai.jobMissing')}</h4>
                  <div className='flex flex-wrap gap-1.5'>
                    {result.missingKeywords.map((kw, i) => (
                      <Badge key={i} variant='destructive' className='text-xs'>
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.suggestions.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-semibold'>{t('ai.jobSuggestions')}</h4>
                  {result.suggestions.map((sug, i) => (
                    <div key={i} className='rounded-md border border-border p-2 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline' className='text-[10px]'>
                          {label('categories', sug.section)}
                        </Badge>
                        <Badge variant='secondary' className='text-[10px]'>
                          {label('actions', sug.action)}
                        </Badge>
                      </div>
                      {sug.current && <p className='text-[11px] text-red-400 line-through'>{sug.current}</p>}
                      <p className='text-[11px] text-green-400'>{sug.suggested}</p>
                      <p className='text-[11px] text-muted-foreground italic'>{sug.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant='outline'
                size='sm'
                className='w-full'
                onClick={() => {
                  setResult(null)
                  setJd('')
                }}
              >
                {t('ai.jobAgain')}
              </Button>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}
