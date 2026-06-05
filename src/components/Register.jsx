import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/api/users', {
        name, email, password
      })
      onLogin(res.data)
      navigate('/')
    } catch (err) {
      setError('Пользователь с таким email уже существует')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Регистрация
          </h1>
          <p className="text-gray-600 mt-2">Создайте новый аккаунт</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Имя</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Зарегистрироваться
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Уже есть аккаунт? <Link to="/login" className="text-indigo-600 hover:underline">Войдите</Link>
        </p>
      </div>
    </div>
  )
}

export default Register