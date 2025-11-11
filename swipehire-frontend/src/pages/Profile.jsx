import React, { useEffect, useState } from 'react'
import TagInput from '../components/TagInput.jsx'

export default function Profile(){
  const [form, setForm] = useState(()=>{
    const saved = localStorage.getItem('swipehire_profile')
    return saved ? JSON.parse(saved) : {
      name:'', major:'', gradYear:'', skills:[], locations:[], interests:[], resumeName:''
    }
  })
  const [msg, setMsg] = useState('')

  useEffect(()=>{ localStorage.setItem('swipehire_profile', JSON.stringify(form)) }, [form])

  const on = (k)=>(e)=> setForm(p=>({...p, [k]: e.target.value}))
  const onFile = (e)=> {
    const f = e.target.files?.[0]
    setForm(p=>({...p, resumeName: f?f.name:''}))
  }
  const validate = ()=>{
    if(!form.name.trim()) return 'Please enter your name.'
    if(!form.major.trim()) return 'Please enter your major.'
    if(!form.gradYear.toString().trim()) return 'Please enter your graduation year.'
    if(form.skills.length===0) return 'Add at least one skill.'
    if(form.interests.length===0) return 'Add at least one job interest.'
    return ''
  }
  const save = (e)=>{
    e.preventDefault()
    const err = validate()
    if(err) return setMsg(err)
    setMsg('Profile saved locally.')
  }

  return (
    <div className="container">
      <div className="card card-lg stack">
        <div>
          <h2>Your Profile</h2>
          <p className="muted" style={{ marginTop:0 }}>Used for local matching in this prototype.</p>
        </div>
        <form onSubmit={save} className="stack">
          <div className="grid-2">
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Full Name</div>
              <input className="input" value={form.name} onChange={on('name')} placeholder="Your name"/>
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Graduation Year</div>
              <input className="input" value={form.gradYear} onChange={on('gradYear')} placeholder="2026"/>
            </div>
          </div>
          <div className="grid-2">
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Major</div>
              <input className="input" value={form.major} onChange={on('major')} placeholder="Computer Science"/>
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Resume (PDF)</div>
              <input type="file" accept=".pdf" onChange={onFile}/>
              {form.resumeName && <div className="muted" style={{ marginTop:6 }}>Selected: <strong>{form.resumeName}</strong></div>}
            </div>
          </div>

          <TagInput label="Skills" value={form.skills}
            onChange={(v)=>setForm(p=>({...p, skills: typeof v==='function' ? v(p.skills): v}))}
            placeholder="React, SQL, Python (Enter)"/>
          <TagInput label="Preferred Locations" value={form.locations}
            onChange={(v)=>setForm(p=>({...p, locations: typeof v==='function' ? v(p.locations): v}))}
            placeholder="Boston, Remote (Enter)"/>
          <TagInput label="Job Interests" value={form.interests}
            onChange={(v)=>setForm(p=>({...p, interests: typeof v==='function' ? v(p.interests): v}))}
            placeholder="Software, Data, Product (Enter)"/>

          <div className="row" style={{ justifyContent:'flex-end' }}>
            <button className="btn btn-primary">Save Profile</button>
            {msg && <div className="muted" style={{ color: msg.includes('saved')? 'var(--success)':'var(--danger)' }}>{msg}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}
