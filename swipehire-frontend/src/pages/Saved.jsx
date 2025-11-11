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
    <div className="container stack" style={{ placeItems:'center' }}>
      <h2>Saved Jobs</h2>
      {liked.length===0 ? (
        <div className="muted">No saved jobs yet. Go to <strong>Swipe</strong> and like some.</div>
      ):(
        <>
          <div className="stack" style={{ width:'min(92vw, 760px)' }}>
            {liked.map(job=> <JobCard key={job.id} job={job}/>)}
          </div>
          <button className="btn btn-ghost" onClick={clear}>Clear Saved</button>
        </>
      )}
    </div>
  )
}
