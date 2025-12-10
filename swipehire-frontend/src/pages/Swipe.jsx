import React, { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard.jsx'
// import { jobs as seed } from '../data/jobs.js'


export default function Swipe() {
  const [queue, setQueue] = useState([]);
  const [liked, setLiked] = useState(
    () => JSON.parse(localStorage.getItem("swipehire_likes") || "[]")
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // keep localStorage in sync like before
  useEffect(() => {
    localStorage.setItem("swipehire_likes", JSON.stringify(liked));
  }, [liked]);

  // fetch jobs from backend on mount
  useEffect(() => {
    const userEmail =
      localStorage.getItem("swipehire_email") || "demo@student.edu";

    fetch(
      `http://127.0.0.1:8000/api/jobs/deck/?user=${encodeURIComponent(
        userEmail
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load jobs");
        return res.json();
      })
      .then((data) => {
        // map job_id -> id so existing code using job.id still works
        setQueue(data.map((j) => ({ ...j, id: j.job_id })));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const current = useMemo(() => queue[0] ?? null, [queue]);

  const recordSwipe = (job, direction) => {
    const userEmail =
      localStorage.getItem("swipehire_email") || "demo@student.edu";

    fetch("http://127.0.0.1:8000/api/swipes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: userEmail,
        job_id: job.id, // we mapped this from job.job_id above
        direction, // "left" or "right"
      }),
    }).catch((err) => {
      console.error("Failed to record swipe", err);
    });
  };

  const pass = () => {
    if (!current) return;
    setQueue((q) => q.slice(1));
    recordSwipe(current, "left");
  };

  const like = () => {
    if (!current) return;
    setLiked((prev) =>
      prev.find((j) => j.id === current.id) ? prev : [...prev, current]
    );
    setQueue((q) => q.slice(1));
    recordSwipe(current, "right");
  };

  if (loading) {
    return (
      <div className="container" style={{ display: "grid", placeItems: "center", gap: 16 }}>
        <h2>Swipe Deck</h2>
        <div>Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ display: "grid", placeItems: "center", gap: 16 }}>
        <h2>Swipe Deck</h2>
        <div>Error loading jobs: {error}</div>
      </div>
    );
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
      ) : (
        <div className="card" style={{ textAlign:'center' }}>
          You’ve reached the end of the deck. Visit <strong>Saved</strong> to review likes.
        </div>
      )}
    </div>
  );
}