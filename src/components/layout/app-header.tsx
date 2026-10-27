'use client'

import React from 'react'
import Link from 'next/link'
import { KeyRound, Settings } from 'lucide-react'

import { BrandMark } from '@/components/layout/brand-mark'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocale } from '@/hooks/use-locale'
import { useSettingsStore } from '@/stores/settings-store'

export function AppHeader() {
  const { setIsSettingsOpen, hasApiKey } = useSettingsStore()
  const { t, locale } = useLocale()

  return (
    <header className='sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl'>
      <div className='flex h-14 items-center justify-between px-6'>
        <Link href='/' className='flex items-center gap-2.5 group'>
          <BrandMark className='h-8 w-8 transition-transform group-hover:scale-105' />
          <span className='text-lg font-semibold tracking-tight'>
            {locale === 'fa' ? 'ورق' : 'Varaq'}
          </span>
        </Link>

        <div className='flex items-center gap-2'>
          {hasApiKey() ? (
            <Badge variant='success' className='gap-1 hidden sm:flex'>
              <KeyRound className='h-3 w-3' />
              {t('header.aiActive')}
            </Badge>
          ) : (
            <Badge variant='outline' className='gap-1 text-muted-foreground hidden sm:flex'>
              <KeyRound className='h-3 w-3' />
              {t('header.noApiKey')}
            </Badge>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' onClick={() => setIsSettingsOpen(true)} id='settings-button'>
                <Settings className='h-4 w-4' />
                <span className='sr-only'>{t('header.settings')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('header.settings')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
