import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

function Test() {
  const { level } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState({})
  const [currentFeedback, setCurrentFeedback] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    loadAndShuffleQuestions()
  }, [level])

  const loadAndShuffleQuestions = async () => {
    const res = await axios.get('http://localhost:4000/api/questions')
    const levelQuestions = res.data.filter(q => q.level === level)
    const shuffled = [...levelQuestions].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 40))
    setAnswers({})
    setFeedback({})
    setCurrentIndex(0)
  }

  const checkAnswer = (questionId, userAnswer, correctAnswer, explanation) => {
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    setFeedback({ ...feedback, [questionId]: { isCorrect, explanation } })
    setCurrentFeedback({ id: questionId, isCorrect, explanation })
    setTimeout(() => setCurrentFeedback(null), 2000)
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderQuestion = (question) => {
    const userAnswer = answers[question.id] || ''
    
    return (
      <div className="space-y-3">
        {question.image && (
          <div className="mb-3">
            <img src={question.image} alt="Question" className="rounded-xl max-h-48 w-full object-cover" />
          </div>
        )}
        
        {question.type === 'multiple' ? (
          <div className="grid gap-2">
            {question.options.map(opt => (
              <label key={opt} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl active:bg-white/10 cursor-pointer transition">
                <input
                  type="radio"
                  name={`q${question.id}`}
                  value={opt}
                  onChange={(e) => {
                    setAnswers({...answers, [question.id]: e.target.value})
                    checkAnswer(question.id, e.target.value, question.correct, question.explanation)
                  }}
                  checked={userAnswer === opt}
                  className="w-5 h-5 text-purple-500"
                />
                <span className="text-white/90 text-sm sm:text-base">{opt}</span>
              </label>
            ))}
          </div>
        ) : question.type === 'writing' ? (
          <textarea
            className="input-field mt-2"
            rows={4}
            value={userAnswer}
            onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                checkAnswer(question.id, e.target.value, question.correct, question.explanation)
              }
            }}
            placeholder="Напишите ответ здесь..."
          />
        ) : (
          <input
            type="text"
            className="input-field mt-2"
            value={userAnswer}
            onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                checkAnswer(question.id, e.target.value, question.correct, question.explanation)
              }
            }}
            placeholder="Введите ответ..."
          />
        )}
      </div>
    )
  }

  const calculateResults = () => {
    let correct = 0
    questions.forEach(q => {
      const userAnswer = answers[q.id]
      if (userAnswer && userAnswer.toLowerCase().trim() === q.correct.toLowerCase().trim()) correct++
    })
    const percentage = (correct / questions.length) * 100
    
    localStorage.setItem('testResults', JSON.stringify({
      correct, total: questions.length, percentage, level,
      questions: questions.map(q => ({
        ...q,
        userAnswer: answers[q.id] || '(не отвечен)',
        isCorrect: answers[q.id]?.toLowerCase().trim() === q.correct.toLowerCase().trim()
      }))
    }))
    navigate('/result')
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">Загрузка...</div>
  }

  const currentQ = questions[currentIndex]
  const answeredCount = Object.keys(answers).length

  // Мобильная версия - по одному вопросу
  if (!showAll && window.innerWidth < 768) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="glass-card p-5">
            {/* Прогресс */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Вопрос {currentIndex + 1}/{questions.length}</span>
                <span>Отвечено: {answeredCount}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300" 
                     style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
              </div>
            </div>

            {/* Вопрос */}
            <div className="mb-6">
              <p className="text-white font-semibold mb-3">{currentIndex + 1}. {currentQ.text}</p>
              {renderQuestion(currentQ)}
            </div>

            {/* Навигация */}
            <div className="flex gap-3">
              <button onClick={prevQuestion} disabled={currentIndex === 0}
                className={`flex-1 py-3 rounded-xl font-semibold ${currentIndex === 0 ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white active:scale-95'}`}>
                ← Назад
              </button>
              {currentIndex < questions.length - 1 ? (
                <button onClick={nextQuestion} className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold active:scale-95">
                  Далее →
                </button>
              ) : (
                <button onClick={calculateResults} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold active:scale-95">
                  📊 Завершить
                </button>
              )}
            </div>

            {/* Кнопка показа всех вопросов */}
            <button onClick={() => setShowAll(true)} className="w-full mt-4 text-center text-white/50 text-sm py-2">
              Показать все вопросы
            </button>
          </div>
        </div>

        <AnimatePresence>
          {currentFeedback && (
            <motion.div className="fixed bottom-5 left-4 right-4 p-3 rounded-xl text-center text-white text-sm"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{ background: currentFeedback.isCorrect ? '#22c55e' : '#ef4444' }}>
              {currentFeedback.explanation}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Десктоп/планшет версия - все вопросы
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pb-20">
      <div className="container mx-auto px-4 py-4">
        <div className="glass-card p-5 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h1 className="text-xl font-bold text-white">Тест: {level}</h1>
            <div className="flex gap-2">
              <button onClick={loadAndShuffleQuestions} className="btn-secondary text-sm px-3 py-1.5">🔄 Новые</button>
              <button onClick={() => setShowAll(false)} className="btn-secondary text-sm px-3 py-1.5">📱 Моб. режим</button>
            </div>
          </div>

          <div className="space-y-5 max-h-[60vh] overflow-y-auto">
            {questions.map((q, idx) => (
              <div key={q.id} className="border-b border-white/10 pb-3">
                <p className="text-white font-semibold mb-2 text-sm">{idx + 1}. {q.text}</p>
                {renderQuestion(q)}
                {feedback[q.id] && (
                  <div className={`mt-2 p-2 rounded-lg text-xs ${feedback[q.id].isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {feedback[q.id].explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={calculateResults} className="btn-primary w-full mt-5 py-3">
            📊 Сдать ({answeredCount}/{questions.length})
          </button>
        </div>
      </div>
    </div>
  )
}

export default Test