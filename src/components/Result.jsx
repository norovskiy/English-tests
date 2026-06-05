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
  
  let colorClass = 'text-red-400'
  let bgClass = 'bg-gradient-to-br from-red-500/20 to-red-600/20'
  let message = 'Нужно больше практики! Продолжайте учиться! 💪'
  let emoji = '📚'
  
  if (percentage >= 85) {
    colorClass = 'text-green-400'
    bgClass = 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    message = 'Отлично! Вы настоящий мастер английского! 🎉🏆'
    emoji = '👑'
  } else if (percentage >= 60) {
    colorClass = 'text-yellow-400'
    bgClass = 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
    message = 'Хороший результат! Но есть куда расти! 🌟'
    emoji = '⭐'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-8 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-white">📊 Результаты теста</h1>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`${bgClass} rounded-2xl p-8 text-center mb-8`}
          >
            <div className="text-7xl mb-2">{emoji}</div>
            <div className="text-5xl font-bold mb-2 text-white">{correct}/{total}</div>
            <div className={`text-4xl font-bold ${colorClass}`}>{percentage.toFixed(1)}%</div>
            <p className="mt-4 text-white/80">{message}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold mb-4 text-white">📝 Детальный разбор:</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {questions.map((q, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl ${
                    q.isCorrect ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{q.isCorrect ? '✓' : '✗'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{idx + 1}. {q.text}</p>
                      <p className="text-sm mt-1 text-white/70">📝 Ваш ответ: <span className="font-medium">{q.userAnswer}</span></p>
                      {!q.isCorrect && (
                        <p className="text-sm mt-1 text-green-400">✅ Правильный ответ: <span className="font-medium">{q.correct}</span></p>
                      )}
                      <p className="text-sm text-white/60 mt-2">💡 {q.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-4 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')} 
              className="btn-primary flex-1"
            >
              🏠 На главную
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)} 
              className="btn-secondary flex-1"
            >
              🔄 Пройти другой тест
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Result