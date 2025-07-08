// api/getAiAnswerStream.ts
export async function getAiAnswerStream(
  question: string,
  onChunk: (text: string) => void
) {
  const response = await fetch(import.meta.env.VITE_OPENAI_API_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '당신은 친절한 개발 멘토입니다.' },
        { role: 'user', content: question },
      ],
      stream: true,
      temperature: 0.7,
    }),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')

  let done = false
  while (!done && reader) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter((line) => line.trim() !== '')

    for (const line of lines) {
      if (line.startsWith('data:')) {
        const json = line.replace(/^data: /, '')
        if (json === '[DONE]') return
        try {
          const parsed = JSON.parse(json)
          const content = parsed?.choices?.[0]?.delta?.content
          if (content) {
            onChunk(content)
          }
        } catch (err) {
          console.error('JSON 파싱 오류:', err, line)
        }
      }
    }
  }
}
