import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get('http://localhost:4000/api/users')
      const user = res.data.find(u => u.email === email && u.password === password)
      
      if (user) {
        onLogin(user)
        navigate('/')
      } else {
        setError('Неверный email или пароль')
      }
    } catch (err) {
      setError('Ошибка сервера')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">📚</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-float opacity-20" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-float opacity-10" style={{ animationDelay: '2s' }}>🌟</div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-white/50"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4 animate-float">🌟</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            English Master
          </h1>
          <p className="text-gray-600 mt-2">Добро пожаловать в мир английского языка!</p>
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-xl mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div initial={{ x: -50 }} animate={{ x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-gray-700 mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </motion.div>
          
          <motion.div initial={{ x: 50 }} animate={{ x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block text-gray-700 mb-2 text-sm">Пароль</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </motion.div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
          >
            🚀 Начать обучение
          </motion.button>
        </form>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
          Нет аккаунта? <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold">Создать аккаунт</Link>
        </p>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-xs text-center text-gray-500">
            🔥 Демо-аккаунт: user@test.com / user123
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login