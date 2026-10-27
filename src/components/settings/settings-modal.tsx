'use client'

import { useCallback, useState } from 'react'
import { Eye, EyeOff, KeyRound, Shield } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useLocale } from '@/hooks/use-locale'
import type { AppLocale } from '@/lib/i18n/locale'
import { useSettingsStore } from '@/stores/settings-store'
import type { ApiProviderType } from '@/types/resume.types'

export function SettingsModal() {
  const { apiKey, apiProvider, isSettingsOpen, setApiKey, setApiProvider, setIsSettingsOpen, hasApiKey } =
    useSettingsStore()
  const { t, locale, setLocale } = useLocale()

  const [localKey, setLocalKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)
  const [wasOpen, setWasOpen] = useState(isSettingsOpen)

  if (isSettingsOpen !== wasOpen) {
    setWasOpen(isSettingsOpen)
    if (isSettingsOpen) setLocalKey(apiKey)
  }

  const handleSave = useCallback(() => {
    setApiKey(localKey.trim())
    toast.success(t('settings.saved'), {
      description: localKey.trim() ? t('settings.keyStored') : t('settings.keyCleared')
    })
    setIsSettingsOpen(false)
  }, [localKey, setApiKey, setIsSettingsOpen, t])

  const handleProviderChange = useCallback(
    (value: string) => {
      setApiProvider(value as ApiProviderType)
    },
    [setApiProvider]
  )

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <KeyRound className='h-5 w-5 text-primary' />
            {t('settings.title')}
          </DialogTitle>
          <DialogDescription>{t('settings.description')}</DialogDescription>
        </DialogHeader>

        <div className='space-y-6 pt-2'>
          <div className='space-y-2'>
            <Label htmlFor='settings-language'>{t('settings.language')}</Label>
            <Select value={locale} onValueChange={value => setLocale(value as AppLocale)}>
              <SelectTrigger id='settings-language'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='fa'>{t('settings.languageFa')}</SelectItem>
                <SelectItem value='en'>{t('settings.languageEn')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='settings-provider'>{t('settings.provider')}</Label>
            <Select value={apiProvider} onValueChange={handleProviderChange}>
              <SelectTrigger id='settings-provider'>
                <SelectValue placeholder={t('settings.providerPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='openai'>{t('settings.openai')}</SelectItem>
                <SelectItem value='gemini'>{t('settings.gemini')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <Label htmlFor='settings-api-key'>{t('settings.apiKey')}</Label>
              {hasApiKey() && <Badge variant='success'>{t('settings.active')}</Badge>}
            </div>
            <div className='relative'>
              <Input
                id='settings-api-key'
                type={showKey ? 'text' : 'password'}
                dir='ltr'
                value={localKey}
                onChange={e => setLocalKey(e.target.value)}
                placeholder={apiProvider === 'openai' ? 'sk-...' : 'AIza...'}
                className='pe-10'
              />
              <button
                type='button'
                onClick={() => setShowKey(!showKey)}
                className='absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
                aria-label={showKey ? t('settings.hideKey') : t('settings.showKey')}
              >
                {showKey ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
            <p className='text-xs text-muted-foreground leading-relaxed'>{t('settings.keyHint')}</p>
          </div>

          <Separator />

          <div className='flex items-start gap-3 rounded-lg bg-muted/50 p-3'>
            <Shield className='h-5 w-5 text-primary mt-0.5 shrink-0' />
            <div className='text-xs text-muted-foreground leading-relaxed'>
              <p className='font-medium text-foreground mb-1'>{t('settings.privacyTitle')}</p>
              <p>{t('settings.privacyBody')}</p>
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setIsSettingsOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>{t('settings.save')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
