'use client'

import React, { useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocale } from '@/hooks/use-locale'
import { useSpeechRecognition } from '@/hooks/use-speech-recognition'

interface MicButtonProps {
  onTranscript: (text: string) => void
  lang?: string
}

export function MicButton({ onTranscript, lang = 'en-US' }: MicButtonProps) {
  const { t } = useLocale()
  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition()

  useEffect(() => {
    if (!isListening && transcript) {
      onTranscript(transcript)
    }
  }, [isListening, transcript, onTranscript])

  if (!isSupported) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type='button' variant='ghost' size='icon' className='h-6 w-6 opacity-30 cursor-not-allowed' disabled>
            <MicOff className='h-3.5 w-3.5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('mic.unsupported')}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className={`h-6 w-6 ${isListening ? 'text-red-400 animate-pulse' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => (isListening ? stopListening() : startListening(lang))}
        >
          {isListening ? <MicOff className='h-3.5 w-3.5' /> : <Mic className='h-3.5 w-3.5' />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isListening ? t('mic.stop') : t('mic.start')}</TooltipContent>
    </Tooltip>
  )
}
