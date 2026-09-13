import React, {useState, useEffect, useMemo} from 'react'
import './App.css'
import quiz from './assets/quiz.json'
import {reset, insertKnownQuestion, isAlreadyKnown} from './services/storage'

const categories = Array.from(new Set(quiz.map(item => item.category))).sort()

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5)

function App() {
  const [position, setPosition] = useState(0 as number)
  const [category, setCategory] = useState('ALL')
  const [showAnswer, setShowAnswer] = useState(false)
  const [successNumber, setSuccessNumber] = useState(0 as number)
  const [errorNumber, setErrorNumber] = useState(0 as number)
  
  const filteredQuiz = useMemo(() => {
    const questions = category === 'ALL'
      ? quiz
      : quiz.filter(item => item.category === category)
    return shuffle(questions)
  }, [category])
  const currentQuestion = filteredQuiz[position]
  const questionAmount = filteredQuiz.length
  const failLength = filteredQuiz.filter(item => !isAlreadyKnown(item.question)).length

  useEffect(() => {
    if (currentQuestion && isAlreadyKnown(currentQuestion.question)) skipQuestion()
  }, [currentQuestion])

  const advance = () => setShowAnswer(true)

  const skipQuestion = () => {
    setPosition((prev) => prev + 1)
    setShowAnswer(false)
  }

  const registerSuccess = (pregunta: string) => {
    setSuccessNumber((prev) => prev + 1)
    insertKnownQuestion(pregunta)
    skipQuestion()
  }

  const registerError = (pregunta: string) => {
    setErrorNumber((prev) => prev + 1)
    skipQuestion()
  }

  const changeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
    setPosition(0)
    setShowAnswer(false)
  }

  return (
    <div className="App">
      <div className="Content">
        <div className="header">
          <div className="stat">
            <span>Score</span>
            <strong>{successNumber}/{successNumber + errorNumber}</strong>
          </div>
          <button className="reset-button" onClick={() => reset()}>Reset progress</button>
          <div className="stat">
            <span>To review</span>
            <strong>{failLength}/{questionAmount}</strong>
          </div>
        </div>
        <label className="category-filter" htmlFor="category">
          Category
          <select id="category" value={category} onChange={changeCategory}>
            <option value="ALL">All categories</option>
            {categories.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        {currentQuestion && <div className="metadata">{currentQuestion.timestamp} · {currentQuestion.category}</div>}
        {!showAnswer && currentQuestion && <button className="question" onClick={advance}><span>{currentQuestion.question}</span><small>Click to reveal the answer</small></button>}
        {showAnswer && currentQuestion ? <div className="response"><div className="answer-label">Answer</div><div className="answer-text">{currentQuestion.answer}</div><p className="description">{currentQuestion.description}</p></div> : <div />}
        {showAnswer && currentQuestion && <div className="buttons">
          <button className="answer" onClick={() => registerSuccess(currentQuestion.question)}>I knew it</button>
          <button className="answer" onClick={() => registerError(currentQuestion.question)}>Still learning</button>
        </div>}
        {!currentQuestion && <div className="completion">You have completed this category.</div>}
      </div>
    </div>
  )
}

export default App
