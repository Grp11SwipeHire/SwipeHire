import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard.jsx'

export default function Saved(){
  const [liked, setLiked] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch liked jobs from backend
  useEffect(()=>{
    const userEmail = localStorage.getItem('swipehire_email') || 'demo@student.edu'
    
    fetch(`http://127.0.0.1:8000/api/likes/?user=${encodeURIComponent(userEmail)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load liked jobs')
        return res.json()
      })
      .then((data) => {
        setLiked(data.map((j) => ({ ...j, id: j.job_id })))
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
        setLoading(false)
        // Fallback to localStorage if backend fails
        const localLikes = JSON.parse(localStorage.getItem('swipehire_likes') || '[]')
        setLiked(localLikes)
      })
  }, [])

  const clear = ()=>{
    setLiked([])
    localStorage.removeItem('swipehire_likes')
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
          {loading ? (
            <div className="muted" style={{ textAlign: 'center' }}>Loading saved jobs...</div>
          ) : error ? (
            <div className="muted" style={{ textAlign: 'center', color: 'var(--danger)' }}>
              Error: {error}
            </div>
          ) : liked.length===0 ? (
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
