'use client'

import React, { useState } from 'react'
import { Download, FileText, FileType, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useLocale } from '@/hooks/use-locale'
import { exportToPdf } from '@/lib/export-pdf'
import { exportToDocx } from '@/lib/export-docx'
import type { ResumeData } from '@/types/resume.types'

interface ExportMenuProps {
  previewRef: React.RefObject<HTMLDivElement | null>
  data: ResumeData
}

export function ExportMenu({ previewRef, data }: ExportMenuProps) {
  const [exporting, setExporting] = useState<'pdf' | 'docx' | null>(null)
  const { t } = useLocale()

  const handlePdfExport = async () => {
    if (!previewRef.current) {
      toast.error(t('exportMenu.previewNotReady'))
      return
    }
    setExporting('pdf')
    try {
      await exportToPdf(previewRef.current, `${data.title || 'resume'}.pdf`)
      toast.success(t('exportMenu.pdfSuccess'))
    } catch (error) {
      console.error('PDF export error:', error)
      toast.error(t('exportMenu.pdfError'))
    } finally {
      setExporting(null)
    }
  }

  const handleDocxExport = async () => {
    setExporting('docx')
    try {
      await exportToDocx(data, `${data.title || 'resume'}.docx`)
      toast.success(t('exportMenu.docxSuccess'))
    } catch (error) {
      console.error('DOCX export error:', error)
      toast.error(t('exportMenu.docxError'))
    } finally {
      setExporting(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='outline' className='gap-1.5' disabled={!!exporting}>
          {exporting ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : <Download className='h-3.5 w-3.5' />}
          {t('exportMenu.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handlePdfExport} disabled={!!exporting}>
          <FileText className='h-4 w-4' />
          {t('exportMenu.pdf')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDocxExport} disabled={!!exporting}>
          <FileType className='h-4 w-4' />
          {t('exportMenu.docx')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
