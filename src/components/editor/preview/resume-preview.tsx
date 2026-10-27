'use client'

import React, { useMemo } from 'react'
import { ALargeSmall, Minus, Plus, Type } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ModernTemplate } from '@/components/editor/preview/templates/modern-template'
import { MinimalistTemplate } from '@/components/editor/preview/templates/minimalist-template'
import { ProfessionalTemplate } from '@/components/editor/preview/templates/professional-template'
import { useLocale } from '@/hooks/use-locale'
import { getResumePresentation, resumeFontStack } from '@/lib/resume-presentation'
import type { AppLocale } from '@/lib/i18n/locale'
import { FONT_FAMILIES, FONT_SIZES } from '@/schemas/resume.schema'
import type { ResumeData, TemplateType, FontSizeType } from '@/types/resume.types'

interface ResumePreviewProps {
  data: ResumeData
  template: TemplateType
  previewRef?: React.RefObject<HTMLDivElement | null>
  onTemplateChange: (template: TemplateType) => void
  onFontFamilyChange: (fontFamily: string) => void
  onFontSizeChange: (fontSize: FontSizeType) => void
  onContentLocaleChange: (locale: AppLocale) => void
}

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  professional: ProfessionalTemplate
} as const

export function ResumePreview({
  data,
  template,
  previewRef,
  onTemplateChange,
  onFontFamilyChange,
  onFontSizeChange,
  onContentLocaleChange
}: ResumePreviewProps) {
  const { t } = useLocale()
  const presentation = getResumePresentation(data)
  const [zoom, setZoom] = React.useState(100)

  const TemplateComponent = useMemo(() => TEMPLATE_MAP[template], [template])

  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 150))
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50))

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0 flex-wrap gap-2'>
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-xs text-muted-foreground'>{t('preview.template')}</span>
          <Select value={template} onValueChange={v => onTemplateChange(v as TemplateType)}>
            <SelectTrigger className='h-7 w-32 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='modern'>{t('preview.templates.modern')}</SelectItem>
              <SelectItem value='minimalist'>{t('preview.templates.minimalist')}</SelectItem>
              <SelectItem value='professional'>{t('preview.templates.professional')}</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation='vertical' className='h-5 hidden sm:block' />

          <div className='flex items-center gap-1.5'>
            <Type className='h-3.5 w-3.5 text-muted-foreground' />
            <Select value={data.fontFamily || 'Inter'} onValueChange={onFontFamilyChange}>
              <SelectTrigger className='h-7 w-32 text-xs'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map(font => (
                  <SelectItem key={font} value={font} className='text-xs'>
                    <span style={{ fontFamily: resumeFontStack(font, presentation.locale) }}>
                      {font === 'Vazirmatn' ? t('preview.vazirmatn') : font}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation='vertical' className='h-5 hidden sm:block' />

          <div className='flex items-center gap-1.5'>
            <ALargeSmall className='h-3.5 w-3.5 text-muted-foreground' />
            <Select value={data.fontSize || 'sm'} onValueChange={v => onFontSizeChange(v as FontSizeType)}>
              <SelectTrigger className='h-7 w-28 text-xs'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_SIZES.map(size => (
                  <SelectItem key={size.value} value={size.value} className='text-xs'>
                    {t(`preview.fontSize.${size.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation='vertical' className='h-5 hidden sm:block' />

          <div className='flex items-center gap-1.5'>
            <span className='text-xs text-muted-foreground'>{t('preview.contentLanguage')}</span>
            <Select value={presentation.locale} onValueChange={value => onContentLocaleChange(value as AppLocale)}>
              <SelectTrigger className='h-7 w-28 text-xs'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='fa'>{t('preview.languages.fa')}</SelectItem>
                <SelectItem value='en'>{t('preview.languages.en')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='icon' className='h-7 w-7' onClick={handleZoomOut} disabled={zoom <= 50} aria-label={t('preview.zoomOut')}>
            <Minus className='h-3.5 w-3.5' />
          </Button>
          <span className='text-xs text-muted-foreground w-10 text-center'>{zoom}%</span>
          <Button variant='ghost' size='icon' className='h-7 w-7' onClick={handleZoomIn} disabled={zoom >= 150} aria-label={t('preview.zoomIn')}>
            <Plus className='h-3.5 w-3.5' />
          </Button>
        </div>
      </div>

      <div className='flex-1 overflow-auto bg-muted/10 p-6 flex justify-center'>
        <div
          ref={previewRef}
          dir={presentation.dir}
          className='a4-page origin-top rounded-sm border border-border/50 shadow-2xl'
          style={{
            width: `${210 * (zoom / 100)}mm`,
            minHeight: `${297 * (zoom / 100)}mm`,
            maxWidth: '100%'
          }}
        >
          <TemplateComponent key={`${template}-${presentation.locale}-${data.fontFamily}`} data={data} />
        </div>
      </div>
    </div>
  )
}
