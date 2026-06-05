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
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-md p-6 sm:p-8 relative z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="text-5xl sm:text-6xl mb-4 animate-float">📚</div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            English Master
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-2">Начните свое путешествие к свободному английскому</p>
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div initial={{ x: -50 }} animate={{ x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-white/80 mb-2 text-sm">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              inputMode="email"
              autoComplete="email"
            />
          </motion.div>
          
          <motion.div initial={{ x: 50 }} animate={{ x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block text-white/80 mb-2 text-sm">Пароль</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </motion.div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary w-full text-base sm:text-lg"
          >
            Войти в аккаунт
          </motion.button>
        </form>
        
        <p className="text-center mt-6 text-white/70 text-sm">
          Нет аккаунта? <Link to="/register" className="text-purple-400 hover:text-purple-300 transition">Создать аккаунт</Link>
        </p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-3 sm:p-4 bg-white/5 rounded-xl"
        >
          <p className="text-xs sm:text-sm text-center text-white/60">
            🔥 Демо-аккаунт: user@test.com / user123
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login