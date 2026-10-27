'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useContentLanguage } from '@/hooks/use-content-language'
import { useLocale } from '@/hooks/use-locale'
import { formatNumber } from '@/lib/i18n'
import { directionFor } from '@/lib/i18n/locale'
import { resumeCopy } from '@/lib/i18n/resume-copy'
import type { ResumeData, SkillLevelType } from '@/types/resume.types'

const SKILL_LEVELS: SkillLevelType[] = ['beginner', 'intermediate', 'advanced', 'expert']

export function SkillsSection() {
  const { watch, setValue } = useFormContext<ResumeData>()
  const { t, locale } = useLocale()
  const contentLocale = useContentLanguage()
  const textDir = directionFor(contentLocale)
  const placeholders = resumeCopy[contentLocale].placeholders
  const rawSkills = watch('skills')
  const skills = useMemo(() => rawSkills || [], [rawSkills])
  const [newSkill, setNewSkill] = useState('')
  const [newLevel, setNewLevel] = useState<SkillLevelType>('intermediate')

  const handleAdd = useCallback(() => {
    if (!newSkill.trim()) return
    if (skills.length >= 20) return
    if (skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) return

    const skill = {
      id: uuidv4(),
      name: newSkill.trim(),
      level: newLevel
    }
    setValue('skills', [...skills, skill])
    setNewSkill('')
  }, [newSkill, newLevel, skills, setValue])

  const handleRemove = useCallback(
    (id: string) => {
      setValue(
        'skills',
        skills.filter(s => s.id !== id)
      )
    },
    [skills, setValue]
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAdd()
      }
    },
    [handleAdd]
  )

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        <Label className='text-xs'>{t('skills.add')}</Label>
        <div className='flex gap-2'>
          <Input
            className='h-8 text-sm flex-1'
            dir={textDir}
            placeholder={placeholders.skill}
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Select value={newLevel} onValueChange={v => setNewLevel(v as SkillLevelType)}>
            <SelectTrigger className='h-8 w-32.5 text-xs'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SKILL_LEVELS.map(level => (
                <SelectItem key={level} value={level} className='text-xs'>
                  {t(`skills.levels.${level}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type='button'
            size='sm'
            className='h-8'
            onClick={handleAdd}
            disabled={!newSkill.trim() || skills.length >= 20}
          >
            <Plus className='h-3.5 w-3.5' />
          </Button>
        </div>
      </div>

      <div className='flex flex-wrap gap-1.5'>
        {skills.map(skill => (
          <Badge key={skill.id} variant='secondary' className='gap-1 pe-1 group/skill'>
            <span className='text-xs' dir='auto'>
              {skill.name}
            </span>
            {skill.level && (
              <span className='text-[10px] text-muted-foreground'>· {t(`skills.levels.${skill.level}`)}</span>
            )}
            <button
              type='button'
              onClick={() => handleRemove(skill.id)}
              aria-label={t('skills.remove', { name: skill.name })}
              className='ms-0.5 rounded-sm p-0.5 hover:bg-destructive/20 transition-colors cursor-pointer'
            >
              <X className='h-3 w-3' />
            </button>
          </Badge>
        ))}
      </div>

      {skills.length === 0 && (
        <p className='text-xs text-muted-foreground text-center py-2'>
          {t('skills.empty')}
        </p>
      )}

      <p className='text-[11px] text-muted-foreground'>
        {t('skills.count', { count: formatNumber(skills.length, locale), max: formatNumber(20, locale) })}
      </p>
    </div>
  )
}
