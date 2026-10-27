import { AI_MODELS, callAI } from '../src/lib/ai/ai-client.ts'

type Provider = 'openai' | 'gemini'

const KEYS: Record<Provider, string | undefined> = {
  openai: process.env.OPENAI_API_KEY,
  gemini: process.env.GEMINI_API_KEY
}

async function verify(provider: Provider, apiKey: string): Promise<boolean> {
  const started = Date.now()
  try {
    const { text } = await callAI(
      provider,
      apiKey,
      [
        { role: 'system', content: 'You are a resume writing assistant. Reply in Persian (Farsi).' },
        { role: 'user', content: 'یک عنوان شغلی کوتاه برای یک توسعه‌دهنده فرانت‌اند ارشد بنویس.' }
      ],
      { maxTokens: 256 }
    )
    console.log(`[PASS] ${provider} (${AI_MODELS[provider]}) in ${Date.now() - started} ms`)
    console.log(`       sample: ${text.slice(0, 120).replace(/\s+/g, ' ')}`)
    return true
  } catch (error) {
    console.log(`[FAIL] ${provider} (${AI_MODELS[provider]}): ${(error as Error).message}`)
    return false
  }
}

const configured = (Object.keys(KEYS) as Provider[]).filter(p => KEYS[p]?.trim())

if (configured.length === 0) {
  console.log('No API key found. Set OPENAI_API_KEY and/or GEMINI_API_KEY in this shell session and re-run.')
  process.exit(2)
}

let allPassed = true
for (const provider of configured) {
  allPassed = (await verify(provider, KEYS[provider]!.trim())) && allPassed
}
process.exit(allPassed ? 0 : 1)
