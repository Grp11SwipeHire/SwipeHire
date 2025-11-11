import React, { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard.jsx'
import { jobs as seed } from '../data/jobs.js'

export default function Swipe(){
  const [queue, setQueue] = useState(seed)
  const [liked, setLiked] = useState(()=>JSON.parse(localStorage.getItem('swipehire_likes')||'[]'))

  useEffect(()=>{ localStorage.setItem('swipehire_likes', JSON.stringify(liked)) }, [liked])

  const current = useMemo(()=> queue[0] ?? null, [queue])

  const pass = ()=> setQueue(q=> q.slice(1))
  const like = ()=>{
    if(!current) return
    setLiked(prev => prev.find(j=>j.id===current.id) ? prev : [...prev, current])
    setQueue(q=> q.slice(1))
  }

  return (
    <div className="container" style={{ display:'grid', placeItems:'center', gap:16 }}>
      <h2>Swipe Deck</h2>
      {current ? (
        <>
          <JobCard job={current}/>
          <div className="row">
            <button className="btn btn-ghost" onClick={pass}>Pass</button>
            <button className="btn btn-primary" onClick={like}>Like</button>
          </div>
          <div className="muted">{queue.length - 1} more in deck • {liked.length} saved</div>
        </>
      ):(
        <div className="card" style={{ textAlign:'center' }}>
          You’ve reached the end of the deck. Visit <strong>Saved</strong> to review likes.
        </div>
      )}
    </div>
  )
}
