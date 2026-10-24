import { toQuestions } from '../lib/exam'
import { rights } from './rights'
import { who } from './who'
import { history } from './history'
import { government, justice } from './government'
import { symbols } from './symbols'
import { geography, economy } from './geography'
import { oath } from './oath'

export const TOPICS: Record<string, string> = {
  rights: 'Rights & responsibilities',
  who: 'Who we are',
  history: 'History',
  government: 'Government',
  justice: 'Justice system',
  symbols: 'Symbols & honours',
  geography: 'Regions & geography',
  economy: 'Economy',
  oath: 'Oath & anthem',
}

export const BANK = [
  ...toQuestions('rights', rights),
  ...toQuestions('who', who),
  ...toQuestions('history', history),
  ...toQuestions('government', government),
  ...toQuestions('justice', justice),
  ...toQuestions('symbols', symbols),
  ...toQuestions('geography', geography),
  ...toQuestions('economy', economy),
  ...toQuestions('oath', oath),
]
