import React from 'react'

export default function JobCard({ job }) {
  if (!job) return null
  return (
    <div style={{
      width: 'min(92vw, 720px)',
      borderRadius: 16,
      background: 'white',
      border: '1px solid #e5e7eb',
      boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
      padding: 20
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ margin: 0 }}>{job.title}</h3>
        <span style={{ color: '#64748b' }}>{job.location}</span>
      </div>
      <div style={{ marginTop: 4, color: '#334155', fontWeight: 600 }}>{job.company}</div>
      <p style={{ color: '#475569' }}>{job.description}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {job.tags?.map(t => (
          <span key={t} style={{
            fontSize: 12, padding: '6px 10px', borderRadius: 9999,
            background: '#eef2ff', color: '#3730a3', fontWeight: 700
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
