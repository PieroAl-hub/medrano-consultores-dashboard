import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Software from '../pages/Software'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/software" element={<Software />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRouter
