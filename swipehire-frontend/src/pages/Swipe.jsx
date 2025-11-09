import React, { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard'
import { jobs as seed } from '../data/jobs'

const btn = {
  base: {
    padding: '12px 16px', borderRadius: 12, border: 'none',
    fontWeight: 800, cursor: 'pointer', minWidth: 120
  },
  pass: { background: '#e2e8f0', color: '#0f172a' },
  like: { background: '#4f46e5', color: 'white' }
}

export default function Swipe() {
  // queue of jobs not yet swiped
  const [queue, setQueue] = useState(seed)
  // liked jobs are stored in localStorage
  const [liked, setLiked] = useState(() => {
    const raw = localStorage.getItem('swipehire_likes')
    return raw ? JSON.parse(raw) : []
  })

  // persist likes
  useEffect(() => {
    localStorage.setItem('swipehire_likes', JSON.stringify(liked))
  }, [liked])

  // current job = head of queue
  const current = useMemo(() => queue[0] ?? null, [queue])

  const pass = () => {
    setQueue(q => q.slice(1))
  }

  const like = () => {
    if (!current) return
    setLiked(prev => {
      // avoid duplicates
      if (prev.find(j => j.id === current.id)) return prev
      return [...prev, current]
    })
    setQueue(q => q.slice(1))
  }

  return (
    <div style={{ padding: 24, display: 'grid', placeItems: 'center', gap: 16 }}>
      <h2 style={{ margin: 0 }}>Swipe Deck</h2>
      {current ? (
        <>
          <JobCard job={current} />
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ ...btn.base, ...btn.pass }} onClick={pass}>Pass</button>
            <button style={{ ...btn.base, ...btn.like }} onClick={like}>Like</button>
          </div>
          <div style={{ color: '#64748b' }}>
            {queue.length - 1} more in deck • {liked.length} saved
          </div>
        </>
      ) : (
        <div style={{
          border: '1px dashed #cbd5e1', borderRadius: 12, padding: 24,
          color: '#64748b', background: 'white'
        }}>
          You’ve reached the end of the deck. Visit <strong>Saved</strong> to review likes.
        </div>
      )}
    </div>
  )
}
