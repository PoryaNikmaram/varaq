'use client'

import React from 'react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

import { getResumePresentation, resumeSections } from '@/lib/resume-presentation'
import { FONT_SIZES } from '@/schemas/resume.schema'
import type { ResumeData } from '@/types/resume.types'

function getFontScale(fontSize: string) {
  const size = FONT_SIZES.find(s => s.value === fontSize)
  return size ? size.basePx : 9
}

function Ltr({ children }: { children: React.ReactNode }) {
  return (
    <span className='resume-ltr' dir='ltr'>
      {children}
    </span>
  )
}

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeSections(data)
  const { dir, rtl, fontStack, copy } = getResumePresentation(data)
  const base = getFontScale(data.fontSize || 'sm')
  const headingTransform = rtl ? 'none' : 'uppercase'
  const headingTracking = rtl ? '0' : '0.12em'

  const sideHeading = {
    fontSize: `${base * 0.9}px`,
    fontWeight: 700,
    textTransform: headingTransform as 'none' | 'uppercase',
    letterSpacing: headingTracking,
    color: '#a78bfa',
    borderBottom: '1px solid rgba(167,139,250,0.3)',
    paddingBottom: base * 0.4,
    marginBottom: base * 0.6
  }

  const mainHeading = {
    fontSize: `${base * 1.1}px`,
    fontWeight: 700,
    textTransform: headingTransform as 'none' | 'uppercase',
    letterSpacing: rtl ? '0' : '0.08em',
    color: '#1a1a2e',
    borderBottom: '2px solid #7c3aed',
    paddingBottom: base * 0.3,
    marginBottom: base * 0.6
  }

  return (
    <div
      dir={dir}
      className='flex min-h-full'
      style={{ fontFamily: fontStack, fontSize: `${base}px`, lineHeight: rtl ? 1.75 : 1.45 }}
    >
      <div
        style={{
          width: '34%',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          color: '#fff',
          padding: `${base * 2}px ${base * 1.5}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${base * 1.4}px`
        }}
      >
        <div>
          <h1 style={{ fontSize: `${base * 1.7}px`, fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
            {personalInfo.fullName || copy.yourName}
          </h1>
          {personalInfo.title && (
            <p style={{ fontSize: `${base * 0.95}px`, color: '#a78bfa', marginTop: base * 0.3, fontWeight: 500 }}>
              {personalInfo.title}
            </p>
          )}
        </div>

        <div>
          <h2 style={sideHeading}>{copy.contact}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${base * 0.5}px` }}>
            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: `${base * 0.4}px` }}>
                <Mail style={{ width: base * 1.1, height: base * 1.1, color: '#a78bfa', flexShrink: 0 }} />
                <Ltr>
                  <span style={{ fontSize: `${base * 0.85}px`, overflowWrap: 'anywhere' }}>{personalInfo.email}</span>
                </Ltr>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: `${base * 0.4}px` }}>
                <Phone style={{ width: base * 1.1, height: base * 1.1, color: '#a78bfa', flexShrink: 0 }} />
                <Ltr>
                  <span style={{ fontSize: `${base * 0.85}px` }}>{personalInfo.phone}</span>
                </Ltr>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: `${base * 0.4}px` }}>
                <MapPin style={{ width: base * 1.1, height: base * 1.1, color: '#a78bfa', flexShrink: 0 }} />
                <span style={{ fontSize: `${base * 0.85}px` }}>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: `${base * 0.4}px` }}>
                <Globe style={{ width: base * 1.1, height: base * 1.1, color: '#a78bfa', flexShrink: 0 }} />
                <Ltr>
                  <span style={{ fontSize: `${base * 0.85}px`, overflowWrap: 'anywhere' }}>{personalInfo.website}</span>
                </Ltr>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: `${base * 0.4}px` }}>
                <Globe style={{ width: base * 1.1, height: base * 1.1, color: '#a78bfa', flexShrink: 0 }} />
                <Ltr>
                  <span style={{ fontSize: `${base * 0.85}px`, overflowWrap: 'anywhere' }}>{personalInfo.linkedin}</span>
                </Ltr>
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 style={sideHeading}>{copy.skills}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${base * 0.3}px` }}>
              {skills.map(skill => (
                <span
                  key={skill.id}
                  style={{
                    padding: `${base * 0.2}px ${base * 0.5}px`,
                    background: 'rgba(167,139,250,0.15)',
                    borderRadius: 3,
                    fontSize: `${base * 0.8}px`,
                    color: '#e0d7ff',
                    lineHeight: 1.6
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 style={sideHeading}>{copy.education}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${base * 0.7}px` }}>
              {education.map(edu => (
                <div key={edu.id} style={{ breakInside: 'avoid' }}>
                  <p style={{ fontWeight: 600, fontSize: `${base * 0.9}px`, margin: 0, lineHeight: 1.5 }}>{edu.degree}</p>
                  <p style={{ fontSize: `${base * 0.8}px`, color: '#ccc', margin: 0 }}>{edu.institution}</p>
                  {edu.field && <p style={{ fontSize: `${base * 0.75}px`, color: '#aaa', margin: 0 }}>{edu.field}</p>}
                  <p style={{ fontSize: `${base * 0.75}px`, color: '#999', margin: 0 }}>
                    {edu.startDate} — {edu.endDate || copy.present}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: `${base * 2}px ${base * 1.8}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${base * 1.2}px`
        }}
      >
        {summary && (
          <div>
            <h2 style={mainHeading}>{copy.summary}</h2>
            <p style={{ fontSize: `${base}px`, color: '#444', lineHeight: rtl ? 1.85 : 1.6, margin: 0, textAlign: 'justify', unicodeBidi: 'plaintext' }}>
              {summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 style={mainHeading}>{copy.experience}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${base}px` }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: `${base * 1.05}px`, color: '#1a1a2e' }}>{exp.position}</span>
                    <span style={{ fontSize: `${base * 0.8}px`, color: '#888', flexShrink: 0 }}>
                      {exp.startDate} — {exp.isCurrentRole ? copy.present : exp.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: `${base * 0.95}px`, color: '#7c3aed', fontWeight: 500 }}>{exp.company}</span>
                    {exp.location && <span style={{ fontSize: `${base * 0.8}px`, color: '#888' }}>• {exp.location}</span>}
                  </div>
                  {(exp.bullets ?? []).filter(Boolean).length > 0 && (
                    <ul
                      style={{
                        margin: `${base * 0.3}px 0 0 0`,
                        paddingInlineStart: `${base * 1.2}px`,
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: `${base * 0.2}px`
                      }}
                    >
                      {(exp.bullets ?? []).filter(Boolean).map((bullet, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: `${base * 0.4}px`, color: '#444', lineHeight: rtl ? 1.75 : 1.5 }}>
                          <span style={{ color: '#7c3aed', marginTop: `${base * 0.35}px`, flexShrink: 0, fontSize: `${base * 0.5}px` }}>●</span>
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
      </div>
    </div>
  )
}
