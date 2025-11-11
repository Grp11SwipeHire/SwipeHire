import React from 'react'

export default function JobCard({ job }){
  if(!job) return null
  return (
    <div className="card card-lg" style={{ width:'min(92vw, 760px)' }}>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'baseline' }}>
        <h3 style={{ margin:0 }}>{job.title}</h3>
        <span className="muted">{job.location}</span>
      </div>
      <div style={{ marginTop:4, fontWeight:700 }}>{job.company}</div>
      <p className="muted" style={{ marginTop:8 }}>{job.description}</p>
      <div className="chips" style={{ marginTop:6 }}>
        {job.tags?.map(t=> <span key={t} className="chip">{t}</span>)}
      </div>
    </div>
  )
}
