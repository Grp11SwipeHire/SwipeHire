import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const nav = useNavigate()
  return (
    <div className="center-screen">
      <div 
        className="card card-lg" 
        style={{ width: 'min(92vw, 720px)', textAlign: 'center', paddingBottom: 32 }}
      >
        <h1 style={{ fontSize: 42 }}>
          SwipeHire
        </h1>

        <p className="muted" style={{ marginTop: 8 }}>
          Discover jobs and internships designed for students — quick, smart, and personalized.
        </p>

        <img 
          src="/umass-campus.jpg" 
          alt="UMass Amherst" 
          style={{ width: '100%', marginTop: 20, borderRadius: 16, objectFit: 'cover', maxHeight: 350 }}
        />

        <button
          className="btn btn-primary"
          style={{ marginTop: 24 }}
          onClick={() => nav('/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
