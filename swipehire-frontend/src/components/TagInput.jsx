import React, { useState } from 'react'

export default function TagInput({ label, value = [], onChange, placeholder = 'Type and press Enter' }){
  const [input, setInput] = useState('')
  const add = (e)=>{
    e.preventDefault()
    const v = input.trim()
    if(!v) return
    if(value.includes(v)) { setInput(''); return }
    onChange([...(value||[]), v])
    setInput('')
  }
  const remove = (t)=> onChange((value||[]).filter(x=>x!==t))
  return (
    <div>
      <div style={{ fontWeight:700, marginBottom:6 }}>{label}</div>
      <div className="chips card" style={{ background:'#0c1430' }}>
        {(value||[]).map(tag=>(
          <span key={tag} className="chip">
            {tag}
            <button type="button" onClick={()=>remove(tag)} aria-label={`Remove ${tag}`}>×</button>
          </span>
        ))}
        <form onSubmit={add} style={{ flex:1, minWidth:160 }}>
          <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder={placeholder}/>
        </form>
      </div>
    </div>
  )
}
