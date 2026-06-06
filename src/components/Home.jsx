import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBook, FaRocket, FaCrown, FaGraduationCap, FaUniversity, FaGlobe } from 'react-icons/fa'

const levels = [
  { id: 'beginner', name: 'Beginner', icon: FaBook, color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50', description: 'Начни с основ', questions: 40, difficulty: 'Easy', emoji: '🌱' },
  { id: 'elementary', name: 'Elementary', icon: FaGraduationCap, color: 'from-sky-400 to-blue-500', bg: 'bg-sky-50', description: 'Простые предложения', questions: 40, difficulty: 'Easy-Medium', emoji: '📘' },
  { id: 'preintermediate', name: 'Pre-Intermediate', icon: FaRocket, color: 'from-purple-400 to-purple-500', bg: 'bg-purple-50', description: 'Средний уровень', questions: 40, difficulty: 'Medium', emoji: '⭐' },
  { id: 'intermediate', name: 'Intermediate', icon: FaCrown, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', description: 'Продвинутый', questions: 40, difficulty: 'Hard', emoji: '🏆' },
  { id: 'upperintermediate', name: 'Upper Int.', icon: FaUniversity, color: 'from-rose-400 to-pink-500', bg: 'bg-rose-50', description: 'Высокий уровень', questions: 40, difficulty: 'Expert', emoji: '🎓' },
  { id: 'ielts', name: 'IELTS/TOEFL', icon: FaGlobe, color: 'from-indigo-400 to-violet-500', bg: 'bg-indigo-50', description: 'Международные экзамены', questions: 40, difficulty: 'Master', emoji: '🌍' }
]

function Home({ user, onLogout }) {
  const navigate = useNavigate()

  const startTest = (levelId, levelName) => {
    if (confirm(`✨ Готовы пройти тест "${levelName}"?\n\n📝 40 интересных вопросов\n🖼️ Вопросы с картинками\n🎯 Проверьте свои знания!`)) {
      navigate(`/test/${levelId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Привет, {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Готовы узнать что-то новое?</p>
            </div>
            <div className="flex gap-3">
              {user.role === 'admin' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/admin')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl shadow-md"
                >
                  🔧 Админка
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-white/50 text-gray-700 px-5 py-2 rounded-xl border border-gray-200 hover:bg-white/80"
              >
                Выйти
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`${level.bg} rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}
              onClick={() => startTest(level.id, level.name)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{level.emoji}</div>
                <div className="flex-1">
                  <h2 className={`text-xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                    {level.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{level.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-600">📝 {level.questions} вопр.</span>
                    <span className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-600">⭐ {level.difficulty}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-orange-500">240+</div>
            <div className="text-gray-600 text-sm">Вопросов</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-orange-500">6</div>
            <div className="text-gray-600 text-sm">Уровней</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-orange-500">🖼️</div>
            <div className="text-gray-600 text-sm">Вопросы с фото</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-orange-500">✨</div>
            <div className="text-gray-600 text-sm">Интерактив</div>
          </div>
        </motion.div>

        {/* Fun Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold">🎉 Интересный факт!</h3>
              <p className="text-white/90 mt-1">Английский язык - самый популярный язык для изучения в мире!</p>
            </div>
            <div className="text-4xl animate-float">🌍</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home