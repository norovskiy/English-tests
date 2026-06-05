import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Test from './components/Test'
import Result from './components/Result'
import Admin from './components/Admin'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsAuth(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuth(true)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuth(false)
    setUser(null)
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={
          !isAuth ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !isAuth ? <Register onLogin={handleLogin} /> : <Navigate to="/" />
        } />
        <Route path="/" element={
          isAuth ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route path="/test/:level" element={
          isAuth ? <Test user={user} /> : <Navigate to="/login" />
        } />
        <Route path="/result" element={
          isAuth ? <Result /> : <Navigate to="/login" />
        } />
        <Route path="/admin" element={
          isAuth && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />
        } />
      </Routes>
    </div>
  )
}

export default App