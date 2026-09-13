import React, {useState, useEffect} from 'react'
import './App.css'
import quiz from './assets/quiz.json'
import {reset, insertKnownQuestion, isAlreadyKnown, alreadyKnownLength} from './services/storage'

const shuffledQuiz = [...quiz].sort(() => Math.random() - 0.5)

function App() {
  const [position, setPosition] = useState(0 as number)
  const [showAnswer, setShowAnswer] = useState(false)
  const [successNumber, setSuccessNumber] = useState(0 as number)
  const [errorNumber, setErrorNumber] = useState(0 as number)
  
  const currentQuestion = shuffledQuiz[position]
  const questionAmount = shuffledQuiz.length
  const failLength = questionAmount - alreadyKnownLength()

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

  return (
    <div className="App">
      <div className="Content">
        <div className="header">
          <div>Score: {successNumber}/{successNumber + errorNumber}</div>
          <button onClick={() => reset()}>Reset history</button>
          <div>Not yet known: {failLength}/{questionAmount}</div>
        </div>
        {!showAnswer && currentQuestion && <div className="question" onClick={advance}>{currentQuestion.question}</div>}
        {showAnswer && currentQuestion ? <div className="response">{currentQuestion.answer}</div> : <div />}
        {showAnswer && currentQuestion && <div className="buttons">
          <button className="answer" onClick={() => registerSuccess(currentQuestion.question)}>La sabia</button>
          <button className="answer" onClick={() => registerError(currentQuestion.question)}>Ni idea</button>
        </div>}
      </div>
    </div>
  )
}

export default App
