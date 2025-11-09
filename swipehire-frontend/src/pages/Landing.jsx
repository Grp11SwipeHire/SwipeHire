import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const nav = useNavigate()
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid', placeItems: 'center',
      background: 'linear-gradient(135deg,#f9fafb,#eef2ff)'
    }}>
      <div style={{
        padding: '32px 28px', borderRadius: 20, background: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center',
        width: 'min(92vw, 680px)'
      }}>
        <h1 style={{ fontSize: 40, margin: 0 }}>SwipeHire</h1>
        <p style={{ marginTop: 12, color: '#475569' }}>
          A fast, student-friendly way to discover internships and jobs.
        </p>
        <button
          onClick={() => nav('/login')}
          style={{ marginTop: 20, padding: '12px 18px', borderRadius: 12, border: 'none',
                   background: '#4f46e5', color: 'white', fontWeight: 700, cursor: 'pointer' }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
