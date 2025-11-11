import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(){
  const { pathname } = useLocation()
  const is = (p) => pathname === p ? 'navlink active' : 'navlink'
  return (
    <div className="navbar">
      <div className="brand">SwipeHire</div>
      <div className="navlinks">
        <Link to="/"        className={is('/')}>Home</Link>
        <Link to="/swipe"   className={is('/swipe')}>Swipe</Link>
        <Link to="/saved"   className={is('/saved')}>Saved</Link>
        <Link to="/profile" className={is('/profile')}>Profile</Link>
        <Link to="/login"   className={is('/login')}>Login</Link>
      </div>
    </div>
  )
}
