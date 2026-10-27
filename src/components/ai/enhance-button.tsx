'use client'

import React, { useState } from 'react'
import { Loader2, Sparkles, Undo2, Check } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useEnhanceContent } from '@/hooks/use-ai'
import { useLocale } from '@/hooks/use-locale'
import { useSettingsStore } from '@/stores/settings-store'

interface EnhanceButtonProps {
  value: string
  onApply: (enhanced: string) => void
}

export function EnhanceButton({ value, onApply }: EnhanceButtonProps) {
  const [enhanced, setEnhanced] = useState<string | null>(null)
  const hasApiKey = useSettingsStore(s => s.hasApiKey)
  const setSettingsOpen = useSettingsStore(s => s.setIsSettingsOpen)
  const mutation = useEnhanceContent()
  const { t } = useLocale()
  const language = useContentLanguage()

  const handleEnhance = async () => {
    if (!hasApiKey()) {
      toast.error(t('ai.keyMissing'))
      setSettingsOpen(true)
      return
    }
    if (!value.trim()) {
      toast.warning(t('ai.nothingToEnhance'))
      return
    }
    try {
      const result = await mutation.mutateAsync({ text: value, language })
      setEnhanced(result)
    } catch {
      return
    }
  }

  const handleApply = () => {
    if (enhanced) {
      onApply(enhanced)
      setEnhanced(null)
      toast.success(t('ai.applied'))
    }
  }

  const handleRevert = () => {
    setEnhanced(null)
  }

  if (enhanced) {
    return (
      <div className='flex items-center gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type='button' variant='ghost' size='icon' className='h-6 w-6 text-green-400' onClick={handleApply}>
              <Check className='h-3.5 w-3.5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('ai.apply')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-6 w-6 text-muted-foreground'
              onClick={handleRevert}
            >
              <Undo2 className='h-3.5 w-3.5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('ai.discard')}</TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='h-6 w-6 text-violet-400 hover:text-violet-300'
          onClick={handleEnhance}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : <Sparkles className='h-3.5 w-3.5' />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('ai.enhance')}</TooltipContent>
    </Tooltip>
  )
}
