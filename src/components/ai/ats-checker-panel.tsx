'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Loader2, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
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
import { useATSCheck, type ATSResult } from '@/hooks/use-ai'
import { useLocale } from '@/hooks/use-locale'
import { useSettingsStore } from '@/stores/settings-store'
import type { ResumeData } from '@/types/resume.types'

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  return 'text-red-400'
}

function getScoreBg(score: number) {
  if (score >= 80) return 'bg-green-500/20 border-green-500/30'
  if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30'
  return 'bg-red-500/20 border-red-500/30'
}

function getPriorityColor(priority: string) {
  if (priority === 'high') return 'destructive'
  if (priority === 'medium') return 'outline'
  return 'secondary'
}

export function ATSCheckerPanel() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<ATSResult | null>(null)
  const { watch } = useFormContext<ResumeData>()
  const hasApiKey = useSettingsStore(s => s.hasApiKey)
  const setSettingsOpen = useSettingsStore(s => s.setIsSettingsOpen)
  const mutation = useATSCheck()
  const { t } = useLocale()
  const language = useContentLanguage()

  const label = (group: 'categories' | 'priority', value: string) => {
    const path = `ai.${group}.${value}`
    const translated = t(path)
    return translated === path ? value : translated
  }

  const handleCheck = async () => {
    if (!hasApiKey()) {
      toast.error(t('ai.keyMissing'))
      setSettingsOpen(true)
      return
    }
    const data = watch()
    const resumeJson = JSON.stringify(data, null, 2)
    try {
      const res = await mutation.mutateAsync({ resumeJson, language })
      setResult(res)
    } catch {
      return
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1.5'>
          <ShieldCheck className='h-3.5 w-3.5' />
          {t('ai.atsButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg max-h-[85vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ShieldCheck className='h-5 w-5 text-violet-400' />
            {t('ai.atsTitle')}
          </DialogTitle>
          <DialogDescription>{t('ai.atsDescription')}</DialogDescription>
        </DialogHeader>

        {!result && (
          <div className='flex flex-col items-center gap-4 py-8'>
            <p className='text-sm text-muted-foreground text-center'>
              {t('ai.atsIntro')}
            </p>
            {mutation.isError && <p className='text-xs text-destructive'>{t('ai.errors.ats')}</p>}
            <Button onClick={handleCheck} disabled={mutation.isPending} className='gap-2'>
              {mutation.isPending ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  {t('ai.atsRunning')}
                </>
              ) : (
                <>
                  <ShieldCheck className='h-4 w-4' />
                  {t('ai.atsRun')}
                </>
              )}
            </Button>
          </div>
        )}

        {result && (
          <ScrollArea className='flex-1 -mx-6 px-6'>
            <div className='space-y-4 pb-4'>
              <div className={`rounded-lg border p-4 text-center ${getScoreBg(result.score)}`}>
                <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
                <div className='text-xs text-muted-foreground mt-1'>{t('ai.atsScore')}</div>
              </div>

              <div className='space-y-2'>
                <h4 className='text-sm font-semibold'>{t('ai.atsCategories')}</h4>
                {Object.entries(result.categories).map(([key, cat]) => (
                  <div key={key} className='flex items-start gap-2 rounded-md border border-border p-2'>
                    {cat.score >= 70 ? (
                      <CheckCircle2 className='h-4 w-4 text-green-400 mt-0.5 shrink-0' />
                    ) : cat.score >= 50 ? (
                      <AlertTriangle className='h-4 w-4 text-yellow-400 mt-0.5 shrink-0' />
                    ) : (
                      <XCircle className='h-4 w-4 text-red-400 mt-0.5 shrink-0' />
                    )}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs font-medium'>{label('categories', key)}</span>
                        <span className={`text-xs font-bold ${getScoreColor(cat.score)}`}>{cat.score}/100</span>
                      </div>
                      <p className='text-[11px] text-muted-foreground mt-0.5'>{cat.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='space-y-2'>
                <h4 className='text-sm font-semibold'>{t('ai.atsSuggestions')}</h4>
                {result.suggestions.map((sug, i) => (
                  <div key={i} className='flex items-start gap-2 text-xs'>
                    <Badge
                      variant={getPriorityColor(sug.priority) as 'destructive' | 'outline' | 'secondary'}
                      className='shrink-0 text-[10px]'
                    >
                      {label('priority', sug.priority)}
                    </Badge>
                    <span className='text-muted-foreground'>{sug.text}</span>
                  </div>
                ))}
              </div>

              <Button variant='outline' size='sm' className='w-full' onClick={() => setResult(null)}>
                {t('ai.atsAgain')}
              </Button>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}
