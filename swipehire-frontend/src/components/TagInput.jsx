import React, { useState } from 'react'

export default function TagInput({ label, value = [], onChange, placeholder = 'Type and press Enter' }) {
  const [input, setInput] = useState('')

  const addTag = (e) => {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    if (value.includes(v)) { setInput(''); return }
    onChange([...(value || []), v])
    setInput('')
  }

  const removeTag = (tag) => {
    onChange((value || []).filter(t => t !== tag))
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        padding: 8, border: '1px solid #e5e7eb', borderRadius: 10, background: 'white'
      }}>
        {(value || []).map(tag => (
          <span key={tag} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: 9999, background: '#eef2ff', color: '#3730a3',
            fontWeight: 600, fontSize: 13
          }}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              style={{
                border: 'none', background: 'transparent', color: '#4f46e5',
                cursor: 'pointer', fontSize: 14, lineHeight: 1
              }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <form onSubmit={addTag} style={{ flex: 1, minWidth: 160 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%', padding: '8px 10px', borderRadius: 8,
              border: '1px solid #e5e7eb', outline: 'none'
            }}
          />
        </form>
      </div>
    </div>
  )
}
