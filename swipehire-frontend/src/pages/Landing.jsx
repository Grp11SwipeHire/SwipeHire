import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const nav = useNavigate()
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.5
      setShowAbout(window.scrollY > trigger)
    }

    // run once in case the user reloads mid-scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <section className="center-screen landing-hero">
        <div 
          className="card card-lg" 
          style={{ width: 'min(92vw, 720px)', textAlign: 'center', paddingBottom: 32 }}
        >
          <h1 style={{ fontSize: 42 }}>
            SwipeHire
          </h1>

          <p className="muted" style={{ marginTop: 8 }}>
            Discover jobs and internships designed for students — quick, smart, and personalized.
          </p>

          <img 
            src="/umass-campus.jpg" 
            alt="UMass Amherst" 
            style={{ width: '100%', marginTop: 20, borderRadius: 16, objectFit: 'cover', maxHeight: 350 }}
          />

          <button
            className="btn btn-primary"
            style={{ marginTop: 24 }}
            onClick={() => nav('/login')}
          >
            Get Started
          </button>
        </div>
      </section>
      <section
        id="about"
        className="landing-about"
        style={{ padding: '48px 0 80px' }}
      >
        <div
          className="container"
          style={{ maxWidth: 960, margin: '0 auto' }}
        >
          <div
            className="card"
            style={{
              borderRadius: 24,
              padding: 28,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
              gap: 24,
              alignItems: 'center',
              background: '#f5f5f5',
              color: '#111827',
              opacity: showAbout ? 1 : 0,
              transform: showAbout ? 'translateY(0px)' : 'translateY(24px)',
              transition: 'opacity 220ms ease-out, transform 220ms ease-out',
            }}
          >
            <div style={{ display: 'grid', gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: '1.9rem' }}>
                About Us
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                SwipeHire is a web application that helps college students efficiently find job and internship opportunities tailored to their skills, experiences, and interests. The system allows users to create a short profile, upload their Resume, swipe through job postings drawn from a sample dataset, and automatically rank right-swiped (“liked”) jobs by how well they match the user’s resume information. The app’s main goal is to make the job search process quicker and more engaging for students while providing university career departments with a modern, data-driven tool to support student employability.
              </p>
            </div>

            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#111827' }}>
              <img
                src="/interview.jpg"
                alt="Students preparing for an interview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
