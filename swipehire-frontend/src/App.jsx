import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Swipe from './pages/Swipe.jsx'
import Saved from './pages/Saved.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/swipe" element={<Swipe/>}/>
        <Route path="/saved" element={<Saved/>}/>
      </Routes>
    </BrowserRouter>
  )
}
