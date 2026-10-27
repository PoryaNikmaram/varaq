'use client'

import React from 'react'

import { getResumePresentation, resumeSections } from '@/lib/resume-presentation'
import { FONT_SIZES } from '@/schemas/resume.schema'
import type { ResumeData } from '@/types/resume.types'

function getFontScale(fontSize: string) {
  const size = FONT_SIZES.find(s => s.value === fontSize)
  return size ? size.basePx : 9
}

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeSections(data)
  const { dir, rtl, fontStack, copy } = getResumePresentation(data)
  const base = getFontScale(data.fontSize || 'sm')

  const contactParts: React.ReactNode[] = []
  if (personalInfo.email) contactParts.push(<span key='email' className='resume-ltr' dir='ltr'>{personalInfo.email}</span>)
  if (personalInfo.phone) contactParts.push(<span key='phone' className='resume-ltr' dir='ltr'>{personalInfo.phone}</span>)
  if (personalInfo.location) contactParts.push(<span key='location'>{personalInfo.location}</span>)
  if (personalInfo.website) contactParts.push(<span key='website' className='resume-ltr' dir='ltr'>{personalInfo.website}</span>)

  const heading = {
    fontSize: `${base * 1.05}px`,
    fontWeight: 600,
    textTransform: (rtl ? 'none' : 'uppercase') as 'none' | 'uppercase',
    letterSpacing: rtl ? '0' : '0.2em',
    color: '#111',
    marginBottom: base * 0.8
  }

  return (
    <div
      dir={dir}
      className='min-h-full'
      style={{
        fontFamily: fontStack,
        fontSize: `${base}px`,
        lineHeight: rtl ? 1.8 : 1.55,
        color: '#333',
        padding: `${base * 2.5}px ${base * 2.2}px`
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: base * 1.8 }}>
        <h1
          style={{
            fontSize: `${base * 2}px`,
            fontWeight: rtl ? 600 : 300,
            letterSpacing: rtl ? '0' : '0.15em',
            textTransform: rtl ? 'none' : 'uppercase',
            color: '#111',
            margin: 0,
            lineHeight: 1.4
          }}
        >
          {personalInfo.fullName || copy.yourName}
        </h1>
        {personalInfo.title && (
          <p style={{ fontSize: `${base * 0.95}px`, color: '#666', marginTop: base * 0.3, letterSpacing: rtl ? '0' : '0.04em' }}>
            {personalInfo.title}
          </p>
        )}
        {contactParts.length > 0 && (
          <div
            style={{
              fontSize: `${base * 0.8}px`,
              color: '#888',
              marginTop: base * 0.5,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: `0 ${base * 0.5}px`
            }}
          >
            {contactParts.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span style={{ color: '#ccc' }}>·</span>}
                {item}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: '#ddd', marginBottom: base * 1.2 }} />

      {summary && (
        <div style={{ marginBottom: base * 1.2 }}>
          <p style={{ fontSize: `${base}px`, color: '#555', lineHeight: rtl ? 1.9 : 1.65, textAlign: 'center', maxWidth: '88%', margin: '0 auto', unicodeBidi: 'plaintext' }}>
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: base * 1.2 }}>
          <h2 style={heading}>{copy.experience}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${base * 0.9}px` }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: `${base * 0.95}px`, color: '#111' }}>{exp.position}</span>
                    <span style={{ color: '#888', marginInline: 4 }}>{copy.at}</span>
                    <span style={{ color: '#444' }}>{exp.company}</span>
                  </div>
                  <span style={{ fontSize: `${base * 0.8}px`, color: '#999', flexShrink: 0 }}>
                    {exp.startDate} — {exp.isCurrentRole ? copy.present : exp.endDate}
                  </span>
                </div>
                {(exp.bullets ?? []).filter(Boolean).length > 0 && (
                  <ul style={{ margin: `${base * 0.2}px 0 0 0`, paddingInlineStart: `${base * 1.2}px`, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: `${base * 0.15}px` }}>
                    {(exp.bullets ?? []).filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: `${base * 0.4}px`, color: '#555' }}>
                        <span style={{ color: '#ccc' }}>—</span>
                        <span style={{ unicodeBidi: 'plaintext' }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: base * 1.2 }}>
          <h2 style={{ ...heading, marginBottom: base * 0.6 }}>{copy.education}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${base * 0.5}px` }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, breakInside: 'avoid' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: `${base * 0.9}px` }}>{edu.degree}</span>
                  {edu.field && (
                    <span style={{ color: '#666' }}>
                      {' '}
                      {copy.inField} {edu.field}
                    </span>
                  )}
                  <span style={{ color: '#888' }}> — {edu.institution}</span>
                </div>
                <span style={{ fontSize: `${base * 0.8}px`, color: '#999', flexShrink: 0 }}>
                  {edu.startDate} — {edu.endDate || copy.present}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 style={{ ...heading, marginBottom: base * 0.5 }}>{copy.skills}</h2>
          <p style={{ fontSize: `${base}px`, color: '#555', margin: 0, lineHeight: 1.7 }}>{skills.map(s => s.name).join(' · ')}</p>
        </div>
      )}
    </div>
  )
}
