'use client'

import React from 'react'

import { getResumePresentation, resumeSections } from '@/lib/resume-presentation'
import { FONT_SIZES } from '@/schemas/resume.schema'
import type { ResumeData } from '@/types/resume.types'

function getFontScale(fontSize: string) {
  const size = FONT_SIZES.find(s => s.value === fontSize)
  return size ? size.basePx : 9
}

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeSections(data)
  const { dir, rtl, fontStack, copy } = getResumePresentation(data)
  const base = getFontScale(data.fontSize || 'sm')

  const contactItems: React.ReactNode[] = []
  if (personalInfo.location) contactItems.push(<span key='location'>{personalInfo.location}</span>)
  if (personalInfo.phone) contactItems.push(<span key='phone' className='resume-ltr' dir='ltr'>{personalInfo.phone}</span>)
  if (personalInfo.email) contactItems.push(<span key='email' className='resume-ltr' dir='ltr'>{personalInfo.email}</span>)
  if (personalInfo.linkedin) contactItems.push(<span key='linkedin' className='resume-ltr' dir='ltr'>{personalInfo.linkedin}</span>)
  if (personalInfo.website) contactItems.push(<span key='website' className='resume-ltr' dir='ltr'>{personalInfo.website}</span>)

  const heading = {
    fontSize: `${base * 1.2}px`,
    fontWeight: 700,
    textTransform: (rtl ? 'none' : 'uppercase') as 'none' | 'uppercase',
    borderBottom: '1.5px solid #333',
    paddingBottom: base * 0.3,
    marginBottom: base * 0.8,
    letterSpacing: rtl ? '0' : '0.05em',
    color: '#111'
  }

  return (
    <div
      dir={dir}
      className='min-h-full px-6 py-5'
      style={{ fontFamily: fontStack, fontSize: `${base}px`, lineHeight: rtl ? 1.75 : 1.5, color: '#222' }}
    >
      <div style={{ marginBottom: base * 0.8 }}>
        <h1 style={{ fontSize: `${base * 2.4}px`, fontWeight: 700, lineHeight: 1.3, color: '#111', margin: 0, overflowWrap: 'break-word' }}>
          {personalInfo.fullName || copy.yourName}
        </h1>
        {personalInfo.title && (
          <p style={{ margin: `${base * 0.25}px 0 0`, fontSize: `${base * 1.05}px`, color: '#333' }}>{personalInfo.title}</p>
        )}
        {contactItems.length > 0 && (
          <div style={{ fontSize: `${base * 0.85}px`, color: '#333', marginTop: base * 0.35, lineHeight: 1.7 }}>
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span style={{ marginInline: 4, color: '#666' }}>|</span>}
                {item}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {summary && (
        <div style={{ marginBottom: base * 1.2 }}>
          <p style={{ fontSize: `${base}px`, lineHeight: rtl ? 1.9 : 1.65, color: '#333', textAlign: 'justify', margin: 0, unicodeBidi: 'plaintext' }}>
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: base * 1.2 }}>
          <h2 style={heading}>{copy.workExperience}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${base}px` }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: `${base * 1.05}px`, color: '#111' }}>{exp.position}</span>
                  {exp.location && <span style={{ fontSize: `${base * 0.9}px`, color: '#333', flexShrink: 0 }}>{exp.location}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: `${base * 0.95}px`, color: '#444' }}>{exp.company}</span>
                  <span style={{ fontSize: `${base * 0.85}px`, color: '#555', flexShrink: 0 }}>
                    {exp.startDate} – {exp.isCurrentRole ? copy.present : exp.endDate}
                  </span>
                </div>
                {(exp.bullets ?? []).filter(Boolean).length > 0 && (
                  <ul style={{ margin: `${base * 0.3}px 0 0 0`, paddingInlineStart: `${base * 1.1}px`, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: `${base * 0.2}px` }}>
                    {(exp.bullets ?? []).filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: `${base * 0.5}px`, lineHeight: rtl ? 1.8 : 1.55, color: '#333', textAlign: 'justify' }}>
                        <span style={{ marginTop: `${base * 0.4}px`, flexShrink: 0, fontSize: `${base * 0.5}px` }}>●</span>
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
          <h2 style={heading}>{copy.education}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${base * 0.8}px` }}>
            {education.map(edu => (
              <div key={edu.id} style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: `${base * 1.05}px`, color: '#111' }}>
                    {edu.degree}
                    {edu.field ? ` ${copy.inField} ${edu.field}` : ''}
                  </span>
                  <span style={{ fontSize: `${base * 0.85}px`, color: '#555', flexShrink: 0 }}>
                    {edu.startDate} – {edu.endDate || copy.present}
                  </span>
                </div>
                <div style={{ fontSize: `${base * 0.95}px`, color: '#444' }}>
                  {edu.institution}
                  {edu.gpa ? ` — ${copy.gpa}: ${edu.gpa}` : ''}
                </div>
                {edu.description && (
                  <p style={{ fontSize: `${base * 0.9}px`, color: '#555', marginTop: base * 0.2, unicodeBidi: 'plaintext' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 style={{ ...heading, marginBottom: base * 0.6 }}>{copy.skills}</h2>
          <p style={{ fontSize: `${base}px`, color: '#333', lineHeight: 1.7 }}>{skills.map(s => s.name).join(' • ')}</p>
        </div>
      )}
    </div>
  )
}
