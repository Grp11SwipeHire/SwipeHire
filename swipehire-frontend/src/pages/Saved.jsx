import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard.jsx'

export default function Saved(){
  const [liked, setLiked] = useState(()=>JSON.parse(localStorage.getItem('swipehire_likes')||'[]'))
  useEffect(()=>{
    const onStorage = ()=>{
      const raw = localStorage.getItem('swipehire_likes')
      setLiked(raw? JSON.parse(raw):[])
    }
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  }, [])
  const clear = ()=>{
    localStorage.removeItem('swipehire_likes'); setLiked([])
  }

  return (
    <div style={{ minHeight: '100vh', background: '#505759' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '40px'
        }}
      >
      <div className="container" style={{ width: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
            Saved Jobs
          </h2>
          {liked.length===0 ? (
            <div className="muted">No saved jobs yet. Go to <strong>Swipe</strong> and like some.</div>
          ):(
            <>
              <div className="stack" style={{ width:'min(92vw, 760px)', margin: '0 auto' }}>
                {liked.map(job=> <JobCard key={job.id} job={job} className="job-card-light"/>)}
              </div>
              <button 
                className="btn btn-ghost" 
                onClick={clear} 
                style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              >
                Clear Saved
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
