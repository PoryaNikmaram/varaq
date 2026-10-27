import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  SectionType,
  convertMillimetersToTwip
} from 'docx'
import { saveAs } from 'file-saver'

import { getResumePresentation } from '@/lib/resume-presentation'
import type { ResumeData } from '@/types/resume.types'

export async function exportToDocx(data: ResumeData, fileName: string = 'resume.docx'): Promise<void> {
  const { personalInfo, summary, experience, education, skills } = data
  const { rtl, copy } = getResumePresentation(data)
  const align = rtl ? AlignmentType.RIGHT : AlignmentType.LEFT
  const fontFamily = data.fontFamily === 'Vazirmatn' ? 'Vazirmatn' : data.fontFamily || 'Inter'

  const children: Paragraph[] = []

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || copy.yourName,
          bold: true,
          size: 32,
          font: fontFamily
        })
      ],
      spacing: { after: 80 },
      alignment: align
    })
  )

  const contactParts: string[] = []
  if (personalInfo.location) contactParts.push(personalInfo.location)
  if (personalInfo.phone) contactParts.push(personalInfo.phone)
  if (personalInfo.email) contactParts.push(personalInfo.email)
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin)
  if (personalInfo.website) contactParts.push(personalInfo.website)

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            size: 18,
            font: fontFamily,
            color: '555555'
          })
        ],
        spacing: { after: 200 },
        alignment: align
      })
    )
  }

  if (summary) {
    children.push(createSectionHeading(rtl ? copy.summary : copy.summary.toUpperCase(), fontFamily, align))
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: summary,
            size: 20,
            font: fontFamily
          })
        ],
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      })
    )
  }

  if (experience.length > 0) {
    children.push(createSectionHeading(rtl ? copy.workExperience : copy.workExperience.toUpperCase(), fontFamily, align))

    for (const exp of experience) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 22,
              font: fontFamily
            }),
            ...(exp.location
              ? [
                  new TextRun({
                    text: `\t${exp.location}`,
                    size: 20,
                    font: fontFamily,
                    color: '555555'
                  })
                ]
              : [])
          ],
          alignment: align,
          spacing: { before: 120 },
          tabStops: [{ type: 'right' as const, position: convertMillimetersToTwip(170) }]
        })
      )

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company,
              size: 20,
              font: fontFamily,
              color: '444444'
            }),
            new TextRun({
              text: `\t${exp.startDate} – ${exp.isCurrentRole ? copy.present : exp.endDate || ''}`,
              size: 18,
              font: fontFamily,
              color: '666666'
            })
          ],
          alignment: align,
          tabStops: [{ type: 'right' as const, position: convertMillimetersToTwip(170) }]
        })
      )

      for (const bullet of exp.bullets.filter(Boolean)) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: bullet,
                size: 20,
                font: fontFamily
              })
            ],
            alignment: align,
            bullet: { level: 0 },
            spacing: { before: 40 }
          })
        )
      }
    }
  }

  if (education.length > 0) {
    children.push(createSectionHeading(rtl ? copy.education : copy.education.toUpperCase(), fontFamily, align))

    for (const edu of education) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree}${edu.field ? ` ${copy.inField} ${edu.field}` : ''}`,
              bold: true,
              size: 22,
              font: fontFamily
            }),
            new TextRun({
              text: `\t${edu.startDate} – ${edu.endDate || copy.present}`,
              size: 18,
              font: fontFamily,
              color: '666666'
            })
          ],
          alignment: align,
          spacing: { before: 120 },
          tabStops: [{ type: 'right' as const, position: convertMillimetersToTwip(170) }]
        })
      )
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution + (edu.gpa ? ` — ${copy.gpa}: ${edu.gpa}` : ''),
              size: 20,
              font: fontFamily,
              color: '444444'
            })
          ],
          alignment: align
        })
      )
    }
  }

  if (skills.length > 0) {
    children.push(createSectionHeading(rtl ? copy.skills : copy.skills.toUpperCase(), fontFamily, align))
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: skills.map(s => s.name).join(' • '),
            size: 20,
            font: fontFamily
          })
        ],
        alignment: align,
        spacing: { after: 200 }
      })
    )
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          type: SectionType.CONTINUOUS,
          page: {
            margin: {
              top: convertMillimetersToTwip(15),
              bottom: convertMillimetersToTwip(15),
              left: convertMillimetersToTwip(20),
              right: convertMillimetersToTwip(20)
            }
          }
        },
        children
      }
    ]
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, fileName)
}

function createSectionHeading(text: string, fontFamily?: string, alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT): Paragraph {
  return new Paragraph({
    alignment,
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        font: fontFamily || 'Inter'
      })
    ],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: {
      bottom: {
        color: '333333',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6
      }
    }
  })
}
