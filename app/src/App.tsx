import { useEffect, useState } from 'react'
import { BANK, TOPICS } from './data/questions'
import { EXAM_SECONDS, PASS_MARK, pickQuestions, score, secondsLeft, type Question, type Result } from './lib/exam'
import { addAttempt, getHistory, getSession, saveSession, type Session } from './lib/store'

type Screen = 'home' | 'exam' | 'results' | 'practice' | 'progress'
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [session, setSession] = useState<Session | null>(null)
  const [done, setDone] = useState<{ session: Session; result: Result } | null>(null)

  const startExam = () => {
    const s: Session = { questions: pickQuestions(BANK), answers: Array(20).fill(null), idx: 0, endsAt: Date.now() + EXAM_SECONDS * 1000 }
    saveSession(s); setSession(s); setScreen('exam')
  }
  const resume = () => { setSession(getSession()); setScreen('exam') }
  const finish = (s: Session) => {
    const result = score(s.questions, s.answers)
    addAttempt(result); saveSession(null)
    setDone({ session: s, result }); setScreen('results')
  }

  return (
    <main>
      {screen === 'home' && <Home onExam={startExam} onResume={getSession() ? resume : undefined} go={setScreen} />}
      {screen === 'exam' && session && <Exam init={session} onFinish={finish} />}
      {screen === 'results' && done && <Results {...done} onHome={() => setScreen('home')} />}
      {screen === 'practice' && <Practice onHome={() => setScreen('home')} />}
      {screen === 'progress' && <Progress onHome={() => setScreen('home')} />}
    </main>
  )
}

function Home({ onExam, onResume, go }: { onExam: () => void; onResume?: () => void; go: (s: Screen) => void }) {
  return (
    <section>
      <h1>Citizenship Test Simulator</h1>
      <p>20 questions · 30 minutes · pass with {PASS_MARK}/20. Based on the IRCC guide <em>Discover Canada</em>.</p>
      {onResume && <button className="primary" onClick={onResume}>Resume exam in progress</button>}
      <button className="primary" onClick={onExam}>Start exam</button>
      <button onClick={() => go('practice')}>Practice by topic</button>
      <button onClick={() => go('progress')}>My progress</button>
    </section>
  )
}

function Exam({ init, onFinish }: { init: Session; onFinish: (s: Session) => void }) {
  const [s, setS] = useState(init)
  const [left, setLeft] = useState(secondsLeft(s.endsAt))
  const update = (p: Partial<Session>) => setS(prev => { const n = { ...prev, ...p }; saveSession(n); return n })

  useEffect(() => {
    const t = setInterval(() => setLeft(secondsLeft(s.endsAt)), 1000)
    return () => clearInterval(t)
  }, [s.endsAt])
  useEffect(() => { if (left === 0) onFinish(s) }, [left]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = s.questions[s.idx]
  const unanswered = s.answers.filter(a => a === null).length
  const submit = () => {
    if (unanswered && !confirm(`${unanswered} question(s) unanswered; they count as wrong. Submit?`)) return
    onFinish(s)
  }

  return (
    <section>
      <header className="bar"><span>Question {s.idx + 1}/{s.questions.length}</span><span className={left < 300 ? 'warn' : ''} aria-label="Time left">{mmss(left)}</span></header>
      <h2>{q.q}</h2>
      <div role="radiogroup" aria-label="Answers">
        {q.options.map((o, i) => (
          <button key={i} role="radio" aria-checked={s.answers[s.idx] === i} className={s.answers[s.idx] === i ? 'picked' : ''}
            onClick={() => update({ answers: s.answers.map((a, k) => (k === s.idx ? i : a)) })}>{o}</button>
        ))}
      </div>
      <nav className="row">
        <button disabled={s.idx === 0} onClick={() => update({ idx: s.idx - 1 })}>Back</button>
        {s.idx < s.questions.length - 1
          ? <button className="primary" onClick={() => update({ idx: s.idx + 1 })}>Next</button>
          : <button className="primary" onClick={submit}>Submit</button>}
      </nav>
      <div className="dots">{s.answers.map((a, i) => <button key={i} aria-label={`Go to question ${i + 1}`} className={`dot ${a !== null ? 'on' : ''} ${i === s.idx ? 'cur' : ''}`} onClick={() => update({ idx: i })}>{i + 1}</button>)}</div>
      {s.idx < s.questions.length - 1 && <button className="link" onClick={submit}>Submit now</button>}
    </section>
  )
}

function Results({ session, result, onHome }: { session: Session; result: Result; onHome: () => void }) {
  const missed = session.questions.map((q, i) => ({ q, a: session.answers[i] })).filter(({ q, a }) => a !== q.answer)
  return (
    <section>
      <h1 className={result.passed ? 'pass' : 'fail'}>{result.passed ? 'Pass' : 'Fail'} — {result.correct}/{result.total}</h1>
      <p>You need {PASS_MARK}/{result.total} to pass.</p>
      {missed.length > 0 && <h2>Review ({missed.length} missed)</h2>}
      {missed.map(({ q, a }) => <Review key={q.id} q={q} chosen={a} />)}
      <button className="primary" onClick={onHome}>Home</button>
    </section>
  )
}

function Review({ q, chosen }: { q: Question; chosen: number | null }) {
  return (
    <article className="card">
      <strong>{q.q}</strong>
      <p className="bad">Your answer: {chosen === null ? 'none' : q.options[chosen]}</p>
      <p className="good">Correct: {q.options[q.answer]}</p>
      <p>{q.explanation} <small>(Discover Canada, p. {q.page})</small></p>
    </article>
  )
}

function Practice({ onHome }: { onHome: () => void }) {
  const [topic, setTopic] = useState('all')
  const [qs, setQs] = useState<Question[]>([])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const start = (t: string) => { setTopic(t); setQs(pickQuestions(t === 'all' ? BANK : BANK.filter(q => q.topic === t), 1000)); setI(0); setPicked(null) }

  if (!qs.length) return (
    <section>
      <h1>Practice</h1>
      <button className="primary" onClick={() => start('all')}>All topics</button>
      {Object.entries(TOPICS).map(([k, v]) => <button key={k} onClick={() => start(k)}>{v}</button>)}
      <button className="link" onClick={onHome}>Home</button>
    </section>
  )
  const q = qs[i]
  return (
    <section>
      <header className="bar"><span>{topic === 'all' ? 'All topics' : TOPICS[topic]}</span><span>{i + 1}/{qs.length}</span></header>
      <h2>{q.q}</h2>
      {q.options.map((o, k) => (
        <button key={k} disabled={picked !== null} className={picked === null ? '' : k === q.answer ? 'right' : k === picked ? 'wrong' : ''} onClick={() => setPicked(k)}>{o}</button>
      ))}
      {picked !== null && <p>{picked === q.answer ? 'Correct. ' : 'Not quite. '}{q.explanation} <small>(p. {q.page})</small></p>}
      <nav className="row">
        <button onClick={() => setQs([])}>Topics</button>
        <button className="primary" disabled={picked === null || i === qs.length - 1} onClick={() => { setI(i + 1); setPicked(null) }}>Next</button>
      </nav>
    </section>
  )
}

function Progress({ onHome }: { onHome: () => void }) {
  const h = getHistory()
  const topics: Record<string, { c: number; t: number }> = {}
  h.forEach(a => Object.entries(a.perTopic).forEach(([k, v]) => { const x = (topics[k] ??= { c: 0, t: 0 }); x.c += v.correct; x.t += v.total }))
  return (
    <section>
      <h1>My progress</h1>
      {!h.length && <p>No exams yet.</p>}
      {[...h].reverse().map(a => <p key={a.date}>{new Date(a.date).toLocaleString()} — {a.correct}/{a.total} {a.passed ? '✓ pass' : '✗ fail'}</p>)}
      {Object.keys(topics).length > 0 && <h2>Accuracy by topic</h2>}
      {Object.entries(topics).map(([k, v]) => <p key={k}>{TOPICS[k]}: {Math.round((100 * v.c) / v.t)}% ({v.c}/{v.t})</p>)}
      <button className="primary" onClick={onHome}>Home</button>
    </section>
  )
}
