import React, { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard.jsx'
import { jobs as seed } from '../data/jobs.js'

export default function Swipe(){
  const [queue, setQueue] = useState(seed)
  const [liked, setLiked] = useState(()=>JSON.parse(localStorage.getItem('swipehire_likes')||'[]'))

  // simple controlled inputs for filters (no logic yet)
  const [locationFilter, setLocationFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [minPayFilter, setMinPayFilter] = useState('')

  useEffect(()=>{
    localStorage.setItem('swipehire_likes', JSON.stringify(liked))
  }, [liked])

  const current = useMemo(()=> queue[0] ?? null, [queue])

  const pass = ()=> setQueue(q=> q.slice(1))
  const like = ()=>{
    if(!current) return
    setLiked(prev => prev.find(j=>j.id===current.id) ? prev : [...prev, current])
    setQueue(q=> q.slice(1))
  }

  return (
    <div className="container">
      <h2 style={{ textAlign:'center', marginBottom:24 }}>
        Pick up from where you left off...
        </h2>
      <div className="swipe-layout">
        <div className="filter-card">
          <h3 style={{ marginBottom:12 }}>
            Filters
            </h3>
          <div style={{ fontSize:14, fontWeight:600, marginTop:8 }}>
            Location
            </div>
          <input
            className="filter-input"
            value={locationFilter}
            onChange={e=>setLocationFilter(e.target.value)}
            placeholder="Enter cities/countries..."
          />
          <div style={{ fontSize:14, fontWeight:600, marginTop:16 }}>
            Role
            </div>
          <input
            className="filter-input"
            value={roleFilter}
            onChange={e=>setRoleFilter(e.target.value)}
            placeholder="Enter keywords..."
          />
          <div style={{ fontSize:14, fontWeight:600, marginTop:16 }}>
            Min. pay
          </div>
          <input
            className="filter-input"
            value={minPayFilter}
            onChange={e=>setMinPayFilter(e.target.value)}
            placeholder="Enter numerical value..."
          />
          <p style={{ marginTop:18, fontSize:11, color:'#3f3f3f' }}>
            Filters are visual only in this prototype. Matching logic will be added in backend.
          </p>
        </div>
        <div style={{ display:'grid', gap:12, justifyItems:'center' }}>
          {current ? (
            <>
              <JobCard job={current} className="job-card-light">
                <div className="row swipe-actions">
                  <button className="btn btn-ghost" onClick={pass}>
                    Pass
                  </button>
                  <button className="btn btn-primary" onClick={like}>
                    Like
                  </button>
                </div>
              </JobCard>
              <div className="muted">
                {queue.length - 1} more in deck • {liked.length} saved
              </div>
            </>
          ) : (
            <div className="card job-card-light" style={{ textAlign:'center' }}>
              You’ve reached the end of the deck. Visit <strong>Saved</strong> to review likes.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
