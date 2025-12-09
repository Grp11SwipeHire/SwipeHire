import React from 'react'

export default function JobCard({ job, className = '', children }){
  if(!job) return null
  return (
    <div
      className={`card card-lg ${className}`}
      style={{ width:'min(92vw, 760px)' }}
    >
      <div className="row" style={{ justifyContent:'space-between', alignItems:'baseline' }}>
        <h3 style={{ margin:0 }}>{job.title}</h3>
        <span >{job.location}</span>
      </div>
      <div style={{ marginTop:4, fontWeight:700 }}>{job.company}</div>
      <p style={{ marginTop: 8, color: '#222' }}>{job.description}</p>
      <div className="chips" style={{ marginTop:6 }}>
        {job.tags?.map(t=> <span key={t} className="chip">{t}</span>)}
      </div>

      {children && (
        <div style={{ marginTop:20 }}>
          {children}
        </div>
      )}
    </div>
  )
}
