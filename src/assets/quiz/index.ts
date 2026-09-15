import quiz20260910 from './2026-09-10.json'
import quiz20260911 from './2026-09-11.json'
import quiz20260912 from './2026-09-12.json'
import quiz20260913 from './2026-09-13.json'
import quiz20260914 from './2026-09-14.json'

export interface QuizItem {
  question: string
  answer: string
  timestamp: string
  description: string
  category: string
}

const quiz: QuizItem[] = [
  ...quiz20260910,
  ...quiz20260911,
  ...quiz20260912,
  ...quiz20260913,
  ...quiz20260914,
]

export default quiz


