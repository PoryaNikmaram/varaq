import type { ApiProviderType } from '@/types/resume.types'

export interface AIMessage {
  role: 'system' | 'user'
  content: string
}

export interface AIResponse {
  text: string
}

export const AI_MODELS: Record<ApiProviderType, string> = {
  openai: 'gpt-4o-mini',
  gemini: 'gemini-3.5-flash-lite'
}

export async function callAI(
  provider: ApiProviderType,
  apiKey: string,
  messages: AIMessage[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  if (!apiKey.trim()) {
    throw new Error('API key is required. Please add your API key in Settings.')
  }

  const temperature = options?.temperature ?? 0.7
  const maxTokens = options?.maxTokens ?? 2048

  try {
    if (provider === 'openai') {
      return await callOpenAI(apiKey, messages, temperature, maxTokens)
    }
    return await callGemini(apiKey, messages, maxTokens)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(redactKey(error.message, apiKey))
    }
    throw error
  }
}

function redactKey(message: string, apiKey: string): string {
  const key = apiKey.trim()
  return key ? message.split(key).join('[REDACTED]') : message
}

async function callOpenAI(
  apiKey: string,
  messages: AIMessage[],
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: AI_MODELS.openai,
      messages,
      temperature,
      max_completion_tokens: maxTokens
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `OpenAI API error: ${res.status}`)
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim() || ''
  if (!text) {
    throw new Error(`OpenAI returned an empty response (finish reason: ${data.choices?.[0]?.finish_reason ?? 'unknown'})`)
  }
  return { text }
}

interface GeminiPart {
  text?: string
  thought?: boolean
}

async function callGemini(apiKey: string, messages: AIMessage[], maxTokens: number): Promise<AIResponse> {
  const systemInstruction = messages.find(m => m.role === 'system')?.content || ''
  const userMessages = messages.filter(m => m.role === 'user')

  const contents = userMessages.map(m => ({
    role: 'user' as const,
    parts: [{ text: m.content }]
  }))

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODELS.gemini}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify({
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      contents,
      generationConfig: {
        maxOutputTokens: maxTokens
      }
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini API error: ${res.status}`)
  }

  const data = await res.json()
  const candidate = data?.candidates?.[0]
  const parts: GeminiPart[] = candidate?.content?.parts ?? []
  const text = parts
    .filter(p => !p.thought && typeof p.text === 'string')
    .map(p => p.text)
    .join('')
    .trim()

  if (!text) {
    const reason = data?.promptFeedback?.blockReason || candidate?.finishReason || 'unknown'
    throw new Error(`Gemini returned an empty response (reason: ${reason})`)
  }
  return { text }
}
