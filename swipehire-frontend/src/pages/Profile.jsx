import React, { useEffect, useState } from 'react'
import TagInput from '../components/TagInput.jsx'

export default function Profile(){
  const [form, setForm] = useState(()=>{
    const saved = localStorage.getItem('swipehire_profile')
    const parsed = saved ? JSON.parse(saved) : {
      name:'', major:'', gradYear:'', skills:[], locations:[], interests:[], resumeName:''
    }
    // Ensure arrays are always arrays (in case old data was stored as strings)
    return {
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      locations: Array.isArray(parsed.locations) ? parsed.locations : [],
      interests: Array.isArray(parsed.interests) ? parsed.interests : [],
    }
  })
  const [msg, setMsg] = useState('')

  useEffect(()=>{ localStorage.setItem('swipehire_profile', JSON.stringify(form)) }, [form])

  const on = (k)=>(e)=> setForm(p=>({...p, [k]: e.target.value}))
  const onFile = (e)=> {
    const f = e.target.files?.[0]
    setForm(p=>({...p, resumeName: f?f.name:''}))
  }
  const validate = (formData = form)=>{
    if(!formData.name.trim()) return 'Please enter your name.'
    if(!formData.major.trim()) return 'Please enter your major.'
    if(!formData.gradYear.toString().trim()) return 'Please enter your graduation year.'
    // Ensure skills is an array and has at least one item
    const skillsArray = Array.isArray(formData.skills) ? formData.skills : []
    if(skillsArray.length === 0) return 'Add at least one skill.'
    // Ensure interests is an array and has at least one item
    const interestsArray = Array.isArray(formData.interests) ? formData.interests : []
    if(interestsArray.length === 0) return 'Add at least one job interest.'
    return ''
  }
  const save = (e)=>{
    e.preventDefault()
    console.log('Form state before validation:', form)
    console.log('Skills type:', typeof form.skills, 'Skills value:', form.skills, 'Is array:', Array.isArray(form.skills))
    console.log('Interests type:', typeof form.interests, 'Interests value:', form.interests, 'Is array:', Array.isArray(form.interests))
    
    const err = validate(form)
    if(err) {
      console.log('Validation error:', err)
      setMsg(err)
      return
    }
    localStorage.setItem('swipehire_profile', JSON.stringify(form))
    setMsg('✓ Profile saved successfully!')
    // Clear message after 3 seconds
    setTimeout(() => setMsg(''), 3000)
  }
  
  const clearProfile = ()=>{
    localStorage.removeItem('swipehire_profile')
    setForm({
      name:'', major:'', gradYear:'', skills:[], locations:[], interests:[], resumeName:''
    })
    setMsg('Profile cleared. Please refresh the page.')
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

          <TagInput label="Skills" value={Array.isArray(form.skills) ? form.skills : []}
            onChange={(v)=>{
              const newSkills = Array.isArray(v) ? v : (typeof v==='function' ? v(form.skills || []) : [])
              setForm(p=>({...p, skills: newSkills}))
            }}
            placeholder="React, SQL, Python (Enter)"/>
          <TagInput label="Preferred Locations" value={Array.isArray(form.locations) ? form.locations : []}
            onChange={(v)=>{
              const newLocations = Array.isArray(v) ? v : (typeof v==='function' ? v(form.locations || []) : [])
              setForm(p=>({...p, locations: newLocations}))
            }}
            placeholder="Boston, Remote (Enter)"/>
          <TagInput label="Job Interests" value={Array.isArray(form.interests) ? form.interests : []}
            onChange={(v)=>{
              const newInterests = Array.isArray(v) ? v : (typeof v==='function' ? v(form.interests || []) : [])
              setForm(p=>({...p, interests: newInterests}))
            }}
            placeholder="Software, Data, Product (Enter)"/>

          <div className="row" style={{ justifyContent:'flex-end', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {msg && (
              <div className="muted" style={{ 
                color: msg.includes('✓') || msg.includes('saved') ? 'var(--success)' : 'var(--danger)',
                fontWeight: msg.includes('✓') ? 'bold' : 'normal'
              }}>
                {msg}
              </div>
            )}
            <button className="btn btn-primary" type="submit">Save Profile</button>
            <button type="button" className="btn btn-ghost" onClick={clearProfile} style={{ fontSize: '0.85em' }}>
              Clear Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
