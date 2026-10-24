import type { Question, Result } from './exam'

// localStorage can throw (private mode, blocked); the app works without it.
function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T } catch { return fallback }
}
function write(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* ignore */ }
}

export type Attempt = { date: number; correct: number; total: number; passed: boolean; perTopic: Result['perTopic'] }
export const getHistory = () => read<Attempt[]>('history', [])
export const addAttempt = (r: Result) =>
  write('history', [...getHistory(), { date: Date.now(), ...r }])

export type Session = { questions: Question[]; answers: (number | null)[]; idx: number; endsAt: number }
export const getSession = () => read<Session | null>('session', null)
export const saveSession = (s: Session | null) => write('session', s)
