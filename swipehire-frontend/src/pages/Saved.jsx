import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'

export default function Saved() {
  const [liked, setLiked] = useState(() => {
    const raw = localStorage.getItem('swipehire_likes')
    return raw ? JSON.parse(raw) : []
  })

  // allow clearing for testing
  const clear = () => {
    localStorage.removeItem('swipehire_likes')
    setLiked([])
  }

  useEffect(() => {
    // sync if other tabs changed localStorage
    const onStorage = () => {
      const raw = localStorage.getItem('swipehire_likes')
      setLiked(raw ? JSON.parse(raw) : [])
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16, placeItems: 'center' }}>
      <h2 style={{ margin: 0 }}>Saved Jobs</h2>
      {liked.length === 0 ? (
        <div style={{ color: '#64748b' }}>No saved jobs yet. Go to <strong>Swipe</strong> and like some.</div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 14 }}>
            {liked.map(job => <JobCard key={job.id} job={job} />)}
          </div>
          <button
            onClick={clear}
            style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white' }}
          >
            Clear Saved
          </button>
        </>
      )}
    </div>
  )
}
