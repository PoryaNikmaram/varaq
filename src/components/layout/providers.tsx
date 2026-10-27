'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SettingsModal } from '@/components/settings/settings-modal'
import { useResumeStore } from '@/stores/resume-store'
import { useSettingsStore } from '@/stores/settings-store'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { retry: 1 },
          queries: { staleTime: 5 * 60 * 1000 }
        }
      })
  )

  const hydrateResumes = useResumeStore(s => s.hydrate)
  const hydrateSettings = useSettingsStore(s => s.hydrate)
  const locale = useSettingsStore(s => s.locale)

  useIsoLayoutEffect(() => {
    hydrateSettings()
    void hydrateResumes()
  }, [hydrateResumes, hydrateSettings])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        {children}
        <SettingsModal />
        <Toaster
          theme='dark'
          dir={locale === 'fa' ? 'rtl' : 'ltr'}
          position={locale === 'fa' ? 'bottom-left' : 'bottom-right'}
          toastOptions={{
            className: 'border-border bg-card text-card-foreground'
          }}
          richColors
          closeButton
        />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
