import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    // no backend yet — pretend success
    nav('/swipe')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button style={{ padding: '10px 14px', borderRadius: 10, border: 'none', background: '#4f46e5', color: 'white', fontWeight: 700 }}>
          Continue
        </button>
      </form>
      <p style={{ marginTop: 12, color: '#64748b' }}>
        (No backend yet — this just routes you to the Swipe deck.)
      </p>
    </div>
  )
}
