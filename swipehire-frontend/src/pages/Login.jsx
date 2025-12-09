import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()
``
  const onSubmit = (e)=>{
    e.preventDefault()
    // simple fake validation
    if(!email.includes('@')) return setMsg('Enter a valid email.')
    if(password.length < 4) return setMsg('Password must be at least 4 characters.')
    localStorage.setItem('swipehire_auth','true')
    nav('/swipe')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#505759' }}>
      <div className="container">
        <div className="card card-lg" style={{ maxWidth: 520, margin: '40px auto' }}>
          <h2>Welcome back!</h2>
          <p className="muted" style={{ marginTop:0 }}>
            No backend yet—this is a simple local prototype.
          </p>
          <form onSubmit={onSubmit} className="stack" style={{ marginTop:12 }}>
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Email</div>
              <input
                className="input"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="you@umass.edu"
              />
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Password</div>
              <input
                className="input"
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {msg && (
              <div className="muted" style={{ color:'var(--danger)' }}>
                {msg}
              </div>
            )}
            <div className="row" style={{ justifyContent:'flex-end' }}>
              <button className="btn btn-primary">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
