import React, { useEffect, useState } from 'react'
import TagInput from '../components/TagInput'

const field = {
  label: { display: 'block', fontWeight: 700, marginBottom: 6 },
  input: {
    width: '100%', padding: '10px 12px', borderRadius: 10,
    border: '1px solid #e5e7eb', outline: 'none', background: 'white'
  }
}

export default function Profile() {
  // restore saved profile from localStorage
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('swipehire_profile')
    return saved ? JSON.parse(saved) : {
      name: '',
      major: '',
      gradYear: '',
      skills: [],
      locations: [],
      interests: [],
      resumeName: ''
    }
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    // autosave on change
    localStorage.setItem('swipehire_profile', JSON.stringify(form))
  }, [form])

  const onChange = (key) => (e) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  const onFile = (e) => {
    const f = e.target.files?.[0]
    setForm(prev => ({ ...prev, resumeName: f ? f.name : '' }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!form.major.trim()) return 'Please enter your major.'
    if (!form.gradYear.toString().trim()) return 'Please enter your graduation year.'
    if (form.skills.length === 0) return 'Add at least one skill.'
    if (form.interests.length === 0) return 'Add at least one job interest.'
    return ''
  }

  const save = (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setMessage(err)
      return
    }
    setMessage('Profile saved locally. (No backend yet.)')
  }

  return (
    <div style={{ padding: 24, maxWidth: 880, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 8 }}>Your Profile</h2>
      <p style={{ color: '#64748b', marginTop: 0 }}>
        Fill this out to personalize your job matches. Data is saved to your browser for now.
      </p>

      <form onSubmit={save} style={{
        display: 'grid', gap: 16,
        background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20
      }}>
        <div>
          <label style={field.label}>Full Name</label>
          <input style={field.input} value={form.name} onChange={onChange('name')} placeholder="Priyal Nanda" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 12 }}>
          <div>
            <label style={field.label}>Major</label>
            <input style={field.input} value={form.major} onChange={onChange('major')} placeholder="Computer Science" />
          </div>
          <div>
            <label style={field.label}>Graduation Year</label>
            <input style={field.input} value={form.gradYear} onChange={onChange('gradYear')} placeholder="2026" />
          </div>
        </div>

        <TagInput
          label="Skills"
          value={form.skills}
          onChange={(v) => setForm(prev => ({ ...prev, skills: typeof v === 'function' ? v(prev.skills) : v }))}
          placeholder="e.g., React, SQL, Python (press Enter)"
        />

        <TagInput
          label="Preferred Locations"
          value={form.locations}
          onChange={(v) => setForm(prev => ({ ...prev, locations: typeof v === 'function' ? v(prev.locations) : v }))}
          placeholder="e.g., Boston, Remote (press Enter)"
        />

        <TagInput
          label="Job Interests"
          value={form.interests}
          onChange={(v) => setForm(prev => ({ ...prev, interests: typeof v === 'function' ? v(prev.interests) : v }))}
          placeholder="e.g., Software, Data, Product (press Enter)"
        />

        <div>
          <label style={field.label}>Resume (PDF)</label>
          <input type="file" accept=".pdf" onChange={onFile} />
          {form.resumeName && (
            <div style={{ marginTop: 8, color: '#475569' }}>
              Selected: <strong>{form.resumeName}</strong>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" style={{
            padding: '10px 14px', borderRadius: 10, border: 'none',
            background: '#4f46e5', color: 'white', fontWeight: 700, cursor: 'pointer'
          }}>
            Save Profile
          </button>
          {message && (
            <div style={{ alignSelf: 'center', color: message.startsWith('Profile saved') ? '#16a34a' : '#b91c1c' }}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
