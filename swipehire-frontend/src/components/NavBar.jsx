import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const linkStyle = (active) => ({
  padding: '10px 14px',
  borderRadius: 10,
  textDecoration: 'none',
  color: active ? 'white' : '#334155',
  background: active ? '#4f46e5' : 'transparent',
  fontWeight: 600
})

export default function NavBar() {
  const { pathname } = useLocation()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px', background: 'white',
      borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10
    }}>
      <div style={{ fontWeight: 800, fontSize: 18 }}>SwipeHire</div>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <Link to="/"       style={linkStyle(pathname === '/')}>Home</Link>
        <Link to="/swipe"  style={linkStyle(pathname === '/swipe')}>Swipe</Link>
        <Link to="/saved"  style={linkStyle(pathname === '/saved')}>Saved</Link>
        <Link to="/profile"style={linkStyle(pathname === '/profile')}>Profile</Link>
        <Link to="/login"  style={linkStyle(pathname === '/login')}>Login</Link>
      </div>
    </div>
  )
}
