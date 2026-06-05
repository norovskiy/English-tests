import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBook, FaRocket, FaCrown, FaGraduationCap, FaUniversity, FaGlobe } from 'react-icons/fa'

const levels = [
  { id: 'beginner', name: 'Beginner', icon: FaBook, color: 'from-green-400 to-emerald-500', bg: 'from-green-600/20', description: 'Начальный уровень', questions: 40, difficulty: 'Easy' },
  { id: 'elementary', name: 'Elementary', icon: FaGraduationCap, color: 'from-blue-400 to-cyan-500', bg: 'from-blue-600/20', description: 'Элементарный уровень', questions: 40, difficulty: 'Easy-Medium' },
  { id: 'preintermediate', name: 'Pre-Intermediate', icon: FaRocket, color: 'from-purple-400 to-pink-500', bg: 'from-purple-600/20', description: 'Средний уровень', questions: 40, difficulty: 'Medium' },
  { id: 'intermediate', name: 'Intermediate', icon: FaCrown, color: 'from-orange-400 to-red-500', bg: 'from-orange-600/20', description: 'Продвинутый уровень', questions: 40, difficulty: 'Hard' },
  { id: 'upperintermediate', name: 'Upper Intermediate', icon: FaUniversity, color: 'from-yellow-400 to-orange-500', bg: 'from-yellow-600/20', description: 'Высокий уровень', questions: 40, difficulty: 'Expert' },
  { id: 'ielts', name: 'IELTS / TOEFL', icon: FaGlobe, color: 'from-red-400 to-pink-500', bg: 'from-red-600/20', description: 'Международные экзамены', questions: 40, difficulty: 'Master' }
]

function Home({ user, onLogout }) {
  const navigate = useNavigate()
  const [stats, setStats] = useState({})

  useEffect(() => {
    const savedStats = localStorage.getItem('userStats')
    if (savedStats) setStats(JSON.parse(savedStats))
  }, [])

  const startTest = (levelId, levelName, difficulty) => {
    if (confirm(`✨ Готовы пройти тест уровня "${levelName}"?\n\n🎯 Уровень сложности: ${difficulty}\n📝 Вас ждет 40 вопросов\n⭐ Разные типы заданий\n🖼️ Вопросы с изображениями\n⚡ Автоматическая смена вопросов`)) {
      navigate(`/test/${levelId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Добро пожаловать, {user.name}! 👋
              </h1>
              <p className="text-white/70 mt-1">Выберите уровень для тестирования</p>
            </div>
            <div className="flex gap-3">
              {user.role === 'admin' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/admin')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl hover:shadow-lg transition-all"
                >
                  🔧 Админка PRO
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-white/10 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition-all"
              >
                Выйти
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Level Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${level.bg} backdrop-blur-sm rounded-2xl p-6 cursor-pointer border border-white/20 hover:border-purple-500/50 transition-all duration-300`}
              onClick={() => startTest(level.id, level.name, level.difficulty)}
            >
              <level.icon className="text-5xl mb-4 text-white/80" />
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent mb-2`}>
                {level.name}
              </h2>
              <p className="text-white/70 text-sm mb-3">{level.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">📝 {level.questions} вопр.</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">⭐ {level.difficulty}</span>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-white/70"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">240+</div>
            <div className="text-white/60 text-sm">Вопросов</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">6</div>
            <div className="text-white/60 text-sm">Уровней</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">5</div>
            <div className="text-white/60 text-sm">Типов заданий</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">🖼️</div>
            <div className="text-white/60 text-sm">Вопросы с фото</div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 mt-8 border border-white/20"
        >
          <h3 className="text-xl font-bold mb-4 text-white">✨ Премиум возможности:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-white/80">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <span>Автоматическая смена вопросов</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🖼️</span>
              <span>Вопросы с изображениями</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <span>Письменные задания</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span>Детальная статистика</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span>6 уровней сложности</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <span>Подробные объяснения</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home