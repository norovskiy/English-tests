import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Result() {
  const [results, setResults] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('testResults')
    if (data) {
      setResults(JSON.parse(data))
    } else {
      navigate('/')
    }
  }, [])

  if (!results) return null

  const { correct, total, percentage, questions, level } = results
  
  let bgGradient = 'from-rose-100 to-orange-100'
  let message = '🌟 Продолжайте практиковаться! У вас всё получится!'
  let emoji = '📚'
  
  if (percentage >= 85) {
    bgGradient = 'from-green-100 to-emerald-100'
    message = '🎉 Поздравляю! Вы настоящий знаток английского! 🏆'
    emoji = '👑'
  } else if (percentage >= 60) {
    bgGradient = 'from-amber-100 to-yellow-100'
    message = '⭐ Отличный результат! Вы на правильном пути!'
    emoji = '⭐'
  } else if (percentage >= 40) {
    bgGradient = 'from-orange-100 to-rose-100'
    message = '💪 Хорошая попытка! Немного практики - и будет отлично!'
    emoji = '📖'
  } else {
    bgGradient = 'from-rose-100 to-red-100'
    message = '🌈 Не сдавайтесь! Каждая ошибка - это шаг к успеху!'
    emoji = '🌟'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              📊 Результаты теста
            </h1>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 text-center mb-8`}
            >
              <div className="text-6xl mb-3">{emoji}</div>
              <div className="text-5xl font-bold mb-2 text-gray-800">{correct}/{total}</div>
              <div className={`text-4xl font-bold ${percentage >= 60 ? 'text-green-600' : percentage >= 40 ? 'text-orange-600' : 'text-rose-600'}`}>
                {percentage.toFixed(1)}%
              </div>
              <p className="mt-4 text-gray-700">{message}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Детальный разбор:</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {questions.map((q, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`p-4 rounded-xl ${
                      q.isCorrect 
                        ? 'bg-green-100 border border-green-200' 
                        : 'bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{q.isCorrect ? '✓' : '✗'}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{idx + 1}. {q.text}</p>
                        {q.image && (
                          <img src={q.image} alt="question" className="mt-2 rounded-lg max-h-32 w-full object-cover" />
                        )}
                        <p className="text-sm mt-2 text-gray-700">
                          📝 Ваш ответ: <span className="font-medium">{q.userAnswer}</span>
                        </p>
                        {!q.isCorrect && (
                          <p className="text-sm mt-1 text-green-700">
                            ✅ Правильный ответ: <span className="font-bold">{q.correct}</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">💡 {q.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => navigate('/')} 
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
              >
                🏠 На главную
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="flex-1 bg-white/50 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 hover:bg-white/80"
              >
                🔄 Пройти другой тест
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Result