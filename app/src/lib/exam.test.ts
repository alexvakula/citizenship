import { describe, expect, it } from 'vitest'
import { BANK } from '../data/questions'
import { EXAM_SIZE, pickQuestions, score, secondsLeft } from './exam'

describe('question bank', () => {
  it('has at least 200 valid questions', () => {
    expect(BANK.length).toBeGreaterThanOrEqual(200)
    expect(new Set(BANK.map(q => q.id)).size).toBe(BANK.length)
    for (const q of BANK) {
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(q.options.length)
      expect(q.page).toBeGreaterThan(0)
    }
  })
})

describe('pickQuestions', () => {
  it('draws 20 distinct questions, 1000 times', () => {
    for (let i = 0; i < 1000; i++) {
      const qs = pickQuestions(BANK)
      expect(qs).toHaveLength(EXAM_SIZE)
      expect(new Set(qs.map(q => q.id)).size).toBe(EXAM_SIZE)
    }
  })
  it('keeps the correct answer after shuffling options', () => {
    const orig = new Map(BANK.map(q => [q.id, q.options[q.answer]]))
    for (const q of pickQuestions(BANK, BANK.length)) expect(q.options[q.answer]).toBe(orig.get(q.id))
  })
})

describe('score', () => {
  const qs = pickQuestions(BANK)
  const answers = (n: number) => qs.map((q, i) => (i < n ? q.answer : null))
  it('15/20 passes, 14/20 fails, unanswered counts wrong', () => {
    expect(score(qs, answers(15)).passed).toBe(true)
    expect(score(qs, answers(14)).passed).toBe(false)
    expect(score(qs, answers(0)).correct).toBe(0)
  })
})

describe('secondsLeft', () => {
  it('counts down and floors at 0', () => {
    expect(secondsLeft(10_000, 4_000)).toBe(6)
    expect(secondsLeft(10_000, 20_000)).toBe(0)
  })
})
