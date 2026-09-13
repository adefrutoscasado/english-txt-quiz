import React, {useState, useMemo, useEffect} from 'react'
import './App.css'
import rawQuiz from './assets/quiz'
import {reset, insertKnownQuestion, isAlreadyKnown, alreadyKnownLength} from './services/storage'

const quiz = rawQuiz
  .split('\n')
  .filter(question => question !== '')
  .reduce((result, value, index, array) => {
    // @ts-ignore
    if (index % 2 === 0) result.push(array.slice(index, index + 2))
    return result
  }, [])
  .sort(() => Math.random() - 0.5)
  .flat() as string[]

function isOdd(number: number) {
    return Math.abs(number % 2) == 1;
}

const isQuestionByPosition = (number: number) => {
  if (number === 0) return true
  return !isOdd(number)
}

function App() {
  const [position, setPosition] = useState(0 as number)
  const [successNumber, setSuccessNumber] = useState(0 as number)
  const [errorNumber, setErrorNumber] = useState(0 as number)
  
  const isQuestion = useMemo(() => {
    return isQuestionByPosition(position)
  }, [position])

  const isResponse = !isQuestion
  const currentQuestion = isResponse ? quiz[position - 1] : quiz[position]
  const questionAmount = quiz.length / 2
  const failLength = questionAmount - alreadyKnownLength()

  useEffect(() => {
    if (isAlreadyKnown(currentQuestion)) skipQuestion()
  }, [position])

  const advance = () => setPosition((prev) => prev + 1)

  const skipQuestion = () => {
    if (isQuestion) setPosition((prev) => prev + 2)
  }

  const registerSuccess = (pregunta: string) => {
    setSuccessNumber((prev) => prev + 1)
    insertKnownQuestion(pregunta)
    advance()
  }

  const registerError = (pregunta: string) => {
    setErrorNumber((prev) => prev + 1)
    advance()
  }

  return (
    <div className="App">
      <div className="Content">
        <div className="header">
          <div>Score: {successNumber}/{successNumber + errorNumber}</div>
          <button onClick={() => reset()}>Reset history</button>
          <div>Not yet known: {failLength}/{questionAmount}</div>
        </div>
        {isQuestion && <div className="question" onClick={advance}>{quiz[position]}</div>}
        {isResponse ? <div className="response">{quiz[position]}</div> : <div />}
        {isResponse && <div className="buttons">
          <button className="answer" onClick={() => registerSuccess(currentQuestion)}>La sabia</button>
          <button className="answer" onClick={() => registerError(currentQuestion)}>Ni idea</button>
        </div>}
      </div>
    </div>
  )
}

export default App
