import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const MODERN_COLOR = /(?:oklch|oklab|lab|color-mix|color)\(/
const colorCache = new Map<string, string>()
let colorCanvas: CanvasRenderingContext2D | null = null

function colorContext(): CanvasRenderingContext2D | null {
  if (colorCanvas) return colorCanvas
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  colorCanvas = canvas.getContext('2d', { willReadFrequently: true })
  return colorCanvas
}

function toRgb(color: string): string {
  const cached = colorCache.get(color)
  if (cached) return cached

  const ctx = colorContext()
  if (!ctx) return color

  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = '#010203'
  ctx.fillStyle = color
  if (ctx.fillStyle === '#010203') return color

  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  const rgb = a < 255 ? `rgba(${r}, ${g}, ${b}, ${Math.round((a / 255) * 1000) / 1000})` : `rgb(${r}, ${g}, ${b})`
  colorCache.set(color, rgb)
  return rgb
}

function normalizeColors(value: string): string {
  if (!MODERN_COLOR.test(value)) return value

  let result = ''
  const pattern = /(?:oklch|oklab|lab|color-mix|color)\(/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(value))) {
    result += value.slice(cursor, match.index)
    let depth = 0
    let end = match.index
    for (; end < value.length; end++) {
      if (value[end] === '(') depth++
      else if (value[end] === ')') {
        depth--
        if (depth === 0) {
          end++
          break
        }
      }
    }
    result += toRgb(value.slice(match.index, end))
    cursor = end
    pattern.lastIndex = end
  }

  return result + value.slice(cursor)
}

function patchComputedColors(view: Window): () => void {
  const previous = view.getComputedStyle
  view.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
    const style = previous.call(view, element, pseudoElt)
    return new Proxy(style, {
      get(target, prop) {
        if (prop === 'getPropertyValue') {
          return (property: string) => normalizeColors(target.getPropertyValue(property))
        }
        const value = Reflect.get(target, prop, target)
        if (typeof value === 'string') return normalizeColors(value)
        if (typeof value === 'function') return (value as (...args: unknown[]) => unknown).bind(target)
        return value
      }
    })
  }) as typeof view.getComputedStyle

  return () => {
    view.getComputedStyle = previous
  }
}

const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

async function captureA4(element: HTMLElement): Promise<HTMLCanvasElement> {
  const previous = {
    width: element.style.width,
    height: element.style.height,
    minHeight: element.style.minHeight,
    maxWidth: element.style.maxWidth,
    overflow: element.style.overflow,
    boxShadow: element.style.boxShadow,
    border: element.style.border,
    borderRadius: element.style.borderRadius,
    position: element.style.position,
    left: element.style.left,
    top: element.style.top,
    zIndex: element.style.zIndex
  }
  const parent = element.parentElement
  const placeholder = document.createElement('div')
  placeholder.style.width = `${element.offsetWidth}px`
  placeholder.style.height = `${element.offsetHeight}px`

  parent?.insertBefore(placeholder, element)
  document.body.appendChild(element)

  element.style.position = 'fixed'
  element.style.left = '0'
  element.style.top = '0'
  element.style.zIndex = '-1'
  element.style.width = `${A4_WIDTH_PX}px`
  element.style.maxWidth = 'none'
  element.style.height = 'auto'
  element.style.minHeight = '0'
  element.style.overflow = 'visible'
  element.style.boxShadow = 'none'
  element.style.border = 'none'
  element.style.borderRadius = '0'

  const contentHeight = Math.ceil(element.scrollHeight)
  const pageHeight = contentHeight <= A4_HEIGHT_PX + 4 ? A4_HEIGHT_PX : contentHeight
  element.style.height = `${pageHeight}px`
  element.style.minHeight = `${pageHeight}px`

  const sheet = element.firstElementChild
  const sheetStyle = sheet instanceof HTMLElement ? { minHeight: sheet.style.minHeight, height: sheet.style.height } : null
  if (sheet instanceof HTMLElement) {
    sheet.style.minHeight = `${pageHeight}px`
    sheet.style.height = `${pageHeight}px`
  }

  const restoreColors = patchComputedColors(window)
  try {
    return await html2canvas(element, {
      scale: 2,
      width: A4_WIDTH_PX,
      height: pageHeight,
      windowWidth: A4_WIDTH_PX,
      windowHeight: pageHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: clonedDocument => {
        const view = clonedDocument.defaultView
        if (view && view !== window) patchComputedColors(view)
      }
    })
  } finally {
    restoreColors()
    if (sheet instanceof HTMLElement && sheetStyle) {
      sheet.style.minHeight = sheetStyle.minHeight
      sheet.style.height = sheetStyle.height
    }
    Object.assign(element.style, previous)
    parent?.insertBefore(element, placeholder)
    placeholder.remove()
  }
}

export async function exportToPdf(element: HTMLElement, fileName: string = 'resume.pdf'): Promise<void> {
  const A4_WIDTH_MM = 210
  const A4_HEIGHT_MM = 297

  const canvas = await captureA4(element)

  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  if (imgHeight <= A4_HEIGHT_MM + 2) {
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth,
      Math.min(imgHeight, A4_HEIGHT_MM),
      undefined,
      'FAST'
    )
  } else {
    let remainingHeight = canvas.height
    let position = 0
    const pageCanvasHeight = (canvas.width * A4_HEIGHT_MM) / A4_WIDTH_MM

    let pageIndex = 0
    while (remainingHeight > 0) {
      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight)

      const ctx = pageCanvas.getContext('2d')
      if (!ctx) break

      ctx.drawImage(canvas, 0, position, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height)

      const pageImgHeight = (pageCanvas.height * A4_WIDTH_MM) / pageCanvas.width

      if (pageIndex > 0) {
        pdf.addPage()
      }

      pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageImgHeight, undefined, 'FAST')

      remainingHeight -= pageCanvasHeight
      position += pageCanvasHeight
      pageIndex++
    }
  }

  pdf.save(fileName)
}
