import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Planner() {
  const navigate = useNavigate()

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function generate() {
    setError("")

    if (!from.trim() || !to.trim()) {
      setError("Please enter both departure city and destination.")
      return
    }

    if (Number(days) < 1) {
      setError("Trip duration must be at least 1 day.")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post("http://localhost:5000/travel", {
        from: from.trim(),
        to: to.trim(),
        days: Number(days),
      })

      navigate("/results", { state: { ...res.data, from, to, days: Number(days) } })
    } catch (err) {
      setError("Travel planner backend is not responding. Please check backend and APIs.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-planner">
      <header className="subHeader">
        <Link to="/" className="backLink">← Back to Home</Link>
        <div className="subHeaderBrand">
          <h1>Plan your next trip</h1>
          <p>Build a beautiful AI-powered trip in seconds with VoyageAI.</p>
        </div>
      </header>

      <section className="plannerShell">
        <div className="plannerInfo">
          <span className="eyebrow">Trip Builder</span>
          <h2>Enter your travel details</h2>
          <p>
            We’ll collect weather, flights, hotels, attractions, route visuals,
            and a complete itinerary for your destination.
          </p>

          <div className="plannerHighlights">
            <div className="miniInfoCard">
              <strong>Beautiful dashboard</strong>
              <span>Not raw text — real product UI</span>
            </div>
            <div className="miniInfoCard">
              <strong>ML fare insights</strong>
              <span>Current vs predicted price clarity</span>
            </div>
            <div className="miniInfoCard">
              <strong>Complete trip flow</strong>
              <span>Hotels, places, map, and itinerary</span>
            </div>
          </div>
        </div>

        <div className="plannerCard">
          <div className="fieldGrid">
            <div className="field">
              <label>From</label>
              <input
                placeholder="e.g. Colombo"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="field">
              <label>To</label>
              <input
                placeholder="e.g. Dubai"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Days</label>
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
          </div>

          {error ? <div className="errorBox">{error}</div> : null}

          <button className="primaryBtn fullWidth" onClick={generate} disabled={loading}>
            {loading ? "Generating your travel dashboard..." : "Generate Travel Plan"}
          </button>
        </div>
      </section>
    </div>
  )
}