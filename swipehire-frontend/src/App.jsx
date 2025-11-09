import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Swipe from './pages/Swipe'
import Saved from './pages/Saved'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}
