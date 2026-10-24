export const EXAM_SIZE = 20
export const PASS_MARK = 15
export const EXAM_SECONDS = 30 * 60

// [question, options (correct first, shuffled at draw time), correctIndex, explanation, guide page]
export type Raw = [string, string[], number, string, number]

export type Question = {
  id: string
  topic: string
  q: string
  options: string[]
  answer: number
  explanation: string
  page: number
}

export type Result = {
  correct: number
  total: number
  passed: boolean
  perTopic: Record<string, { correct: number; total: number }>
}

export function toQuestions(topic: string, raws: Raw[]): Question[] {
  return raws.map(([q, options, answer, explanation, page], i) => ({
    id: `${topic}-${i}`, topic, q, options, answer, explanation, page,
  }))
}

function shuffle<T>(a: T[], rng: () => number): T[] {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

const isTF = (q: Question) => q.options.length === 2

// Random, non-repeating draw; multiple-choice options are reshuffled (true/false keeps its order).
export function pickQuestions(bank: Question[], n = EXAM_SIZE, rng = Math.random): Question[] {
  return shuffle(bank, rng).slice(0, n).map(q => {
    if (isTF(q)) return q
    const correct = q.options[q.answer]
    const options = shuffle(q.options, rng)
    return { ...q, options, answer: options.indexOf(correct) }
  })
}

// answers[i] = chosen option index, or null/undefined if unanswered
export function score(questions: Question[], answers: (number | null | undefined)[]): Result {
  const perTopic: Result['perTopic'] = {}
  let correct = 0
  questions.forEach((q, i) => {
    const t = (perTopic[q.topic] ??= { correct: 0, total: 0 })
    t.total++
    if (answers[i] === q.answer) { correct++; t.correct++ }
  })
  return { correct, total: questions.length, passed: correct >= PASS_MARK, perTopic }
}

export const secondsLeft = (endsAt: number, now = Date.now()) =>
  Math.max(0, Math.ceil((endsAt - now) / 1000))
