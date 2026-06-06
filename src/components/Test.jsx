import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

function Test() {
  const { level } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [showExplanations, setShowExplanations] = useState({})
  const [submitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    loadAndShuffleQuestions()
  }, [level])

  const loadAndShuffleQuestions = async () => {
    const res = await axios.get('http://localhost:4000/api/questions')
    const levelQuestions = res.data.filter(q => q.level === level)
    const shuffled = [...levelQuestions].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 50))
    setAnswers({})
    setShowExplanations({})
    setSubmitted(false)
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
    if (showExplanations[questionId]) {
      setShowExplanations({ ...showExplanations, [questionId]: false })
    }
  }

  const checkSingleAnswer = (questionId, userAnswer, correctAnswer, explanation) => {
    const isCorrect = userAnswer?.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    setShowExplanations({
      ...showExplanations,
      [questionId]: { show: true, isCorrect, explanation, userAnswer, correctAnswer }
    })
  }

  const handleSubmitExam = () => {
    const newExplanations = {}
    questions.forEach(q => {
      const userAnswer = answers[q.id]
      let isCorrect = false
      
      if (q.type === 'cloze_options' || q.type === 'cloze_no_options') {
        const userAnswers = userAnswer?.toLowerCase().split(',').map(a => a.trim())
        const correctAnswers = q.correct.toLowerCase().split(',').map(a => a.trim())
        isCorrect = JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)
      } else {
        isCorrect = userAnswer?.toLowerCase().trim() === q.correct.toLowerCase().trim()
      }
      
      newExplanations[q.id] = {
        show: true,
        isCorrect: isCorrect || false,
        explanation: q.explanation,
        userAnswer: userAnswer || '(не отвечен)',
        correctAnswer: q.correct
      }
    })
    setShowExplanations(newExplanations)
    setSubmitted(true)
  }

  const calculateResults = () => {
    let correct = 0
    questions.forEach(q => {
      const userAnswer = answers[q.id]
      let isCorrect = false
      
      if (q.type === 'cloze_options' || q.type === 'cloze_no_options') {
        const userAnswers = userAnswer?.toLowerCase().split(',').map(a => a.trim())
        const correctAnswers = q.correct.toLowerCase().split(',').map(a => a.trim())
        isCorrect = JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)
      } else {
        isCorrect = userAnswer?.toLowerCase().trim() === q.correct.toLowerCase().trim()
      }
      
      if (isCorrect) correct++
    })
    const percentage = (correct / questions.length) * 100
    
    localStorage.setItem('testResults', JSON.stringify({
      correct,
      total: questions.length,
      percentage,
      level,
      questions: questions.map(q => {
        let isCorrect = false
        const userAnswer = answers[q.id]
        
        if (q.type === 'cloze_options' || q.type === 'cloze_no_options') {
          const userAnswers = userAnswer?.toLowerCase().split(',').map(a => a.trim())
          const correctAnswers = q.correct.toLowerCase().split(',').map(a => a.trim())
          isCorrect = JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)
        } else {
          isCorrect = userAnswer?.toLowerCase().trim() === q.correct.toLowerCase().trim()
        }
        
        return {
          ...q,
          userAnswer: answers[q.id] || '(не отвечен)',
          isCorrect: isCorrect || false
        }
      })
    }))
    
    navigate('/result')
  }

  const getQuestionTypeLabel = (type) => {
    const labels = {
      multiple: '📝 Выберите ответ',
      spelling: '✍️ Напишите слово',
      definition: '📖 Что это за слово?',
      grammar: '📚 Грамматика',
      cloze_options: '📄 Вставьте слова (с подсказками)',
      cloze_no_options: '🎯 Вставьте слова (без подсказок)'
    }
    return labels[type] || '📝 Вопрос'
  }

  const renderQuestion = (question) => {
    const userAnswer = answers[question.id] || ''
    const explanation = showExplanations[question.id]
    
    if (question.type === 'multiple') {
      return (
        <div className="space-y-2 mt-3">
          {question.options.map(opt => (
            <label key={opt} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 cursor-pointer transition">
              <input
                type="radio"
                name={`q${question.id}`}
                value={opt}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                checked={userAnswer === opt}
                className="w-5 h-5 text-orange-500"
                disabled={submitted}
              />
              <span className="text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
      )
    }
    
    if (question.type === 'cloze_options' || question.type === 'cloze_no_options') {
      return (
        <div className="mt-3">
          <div className="bg-orange-50 p-4 rounded-xl mb-3">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{question.text}</p>
          </div>
          <textarea
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            value={userAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Введите пропущенные слова через запятую (например: went,was,had)"
            disabled={submitted}
          />
          <p className="text-xs text-gray-500 mt-1">💡 Введите слова через запятую в правильном порядке</p>
        </div>
      )
    }
    
    return (
      <div className="mt-3">
        <input
          type="text"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={userAnswer}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder="Введите ваш ответ здесь..."
          disabled={submitted}
        />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-xl">Загрузка вопросов...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h1 className="text-2xl font-bold text-gray-800">📖 Тест: {level}</h1>
              <div className="flex gap-3">
                <button
                  onClick={loadAndShuffleQuestions}
                  className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                >
                  🔄 Новые вопросы
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
                >
                  🏠 Выход
                </button>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Отвечено: {Object.keys(answers).length} / {questions.length}</p>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-orange-500">{idx + 1}</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {getQuestionTypeLabel(q.type)}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-lg mb-3">{q.text}</p>
                
                {renderQuestion(q)}
                
                {!submitted && answers[q.id] && !showExplanations[q.id] && (
                  <button
                    onClick={() => checkSingleAnswer(q.id, answers[q.id], q.correct, q.explanation)}
                    className="mt-3 text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Проверить ответ
                  </button>
                )}
                
                {showExplanations[q.id]?.show && (
                  <div className={`mt-3 p-4 rounded-xl border ${
                    showExplanations[q.id].isCorrect 
                      ? 'bg-green-100 border-green-400' 
                      : 'bg-red-100 border-red-400'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{showExplanations[q.id].isCorrect ? '✓' : '✗'}</span>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {showExplanations[q.id].isCorrect ? 'Правильно!' : 'Неправильно'}
                        </p>
                        {!showExplanations[q.id].isCorrect && (
                          <p className="text-sm mt-1 text-green-700">
                            Правильный ответ: <span className="font-bold">{showExplanations[q.id].correctAnswer}</span>
                          </p>
                        )}
                        <p className="text-sm mt-1 text-gray-700">{showExplanations[q.id].explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmitExam}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              📊 Проверить все ответы
            </button>
          ) : (
            <button
              onClick={calculateResults}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              🎯 Завершить экзамен и увидеть результат
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Test