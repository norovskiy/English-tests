import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEdit, FaTrash, FaPlus, FaImage, FaSave, FaTimes } from 'react-icons/fa'

function Admin() {
  const [questions, setQuestions] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    level: 'beginner',
    type: 'multiple',
    text: '',
    options: [],
    correct: '',
    explanation: '',
    image: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    const res = await axios.get('http://localhost:4000/api/questions')
    setQuestions(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const questionData = {
        ...formData,
        options: formData.type === 'multiple' ? formData.options.split(',').map(o => o.trim()) : []
      }
      
      if (editingId) {
        await axios.put(`http://localhost:4000/api/questions/${editingId}`, questionData)
        setMessage('✅ Вопрос обновлен!')
      } else {
        await axios.post('http://localhost:4000/api/questions', questionData)
        setMessage('✅ Вопрос добавлен!')
      }
      
      resetForm()
      loadQuestions()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('❌ Ошибка сохранения')
    }
  }

  const handleEdit = (question) => {
    setEditingId(question.id)
    setFormData({
      level: question.level,
      type: question.type,
      text: question.text,
      options: question.options ? question.options.join(', ') : '',
      correct: question.correct,
      explanation: question.explanation,
      image: question.image || ''
    })
  }

  const handleDelete = async (id) => {
    if (confirm('🗑️ Удалить вопрос?')) {
      await axios.delete(`http://localhost:4000/api/questions/${id}`)
      setMessage('✅ Вопрос удален!')
      loadQuestions()
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      level: 'beginner',
      type: 'multiple',
      text: '',
      options: '',
      correct: '',
      explanation: '',
      image: ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
        >
          <h1 className="text-3xl font-bold mb-6 text-white">🔧 Админ-панель PRO</h1>
          
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-xl mb-4"
            >
              {message}
            </motion.div>
          )}

          {/* Форма добавления/редактирования */}
          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">
              {editingId ? '✏️ Редактировать вопрос' : '➕ Добавить новый вопрос'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  className="input-field"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  <option value="beginner">Beginner</option>
                  <option value="elementary">Elementary</option>
                  <option value="preintermediate">Pre-Intermediate</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="upperintermediate">Upper Intermediate</option>
                  <option value="ielts">IELTS / TOEFL</option>
                </select>
                
                <select
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="multiple">Множественный выбор</option>
                  <option value="translate">Перевод</option>
                  <option value="fill">Заполнить пропуск</option>
                  <option value="meaning">Объяснение значения</option>
                  <option value="writing">Письменное задание</option>
                </select>
              </div>
              
              <textarea
                className="input-field"
                placeholder="Текст вопроса"
                rows="2"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                required
              />
              
              <input
                className="input-field"
                placeholder="URL изображения (опционально)"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
              
              {formData.type === 'multiple' && (
                <input
                  className="input-field"
                  placeholder="Варианты ответов (через запятую)"
                  value={formData.options}
                  onChange={(e) => setFormData({...formData, options: e.target.value})}
                  required
                />
              )}
              
              <input
                className="input-field"
                placeholder="Правильный ответ"
                value={formData.correct}
                onChange={(e) => setFormData({...formData, correct: e.target.value})}
                required
              />
              
              <textarea
                className="input-field"
                placeholder="Объяснение ответа"
                rows="2"
                value={formData.explanation}
                onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                required
              />
              
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  {editingId ? <><FaSave className="inline mr-2" /> Обновить</> : <><FaPlus className="inline mr-2" /> Добавить</>}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    <FaTimes className="inline mr-2" /> Отмена
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Список вопросов */}
          <h2 className="text-xl font-bold mb-4 text-white">📋 Все вопросы ({questions.length})</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {questions.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">{q.level}</span>
                        <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded">{q.type}</span>
                        {q.image && <span className="text-xs bg-green-500/30 text-green-200 px-2 py-1 rounded">🖼️ Есть фото</span>}
                      </div>
                      <p className="font-medium text-white">{idx + 1}. {q.text}</p>
                      <p className="text-sm text-green-400 mt-1">✅ {q.correct}</p>
                      {q.explanation && (
                        <p className="text-sm text-white/60 mt-1">💡 {q.explanation}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(q)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Admin