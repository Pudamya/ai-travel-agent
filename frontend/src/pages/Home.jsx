import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="page page-home">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">V</div>
          <div>
            <h3>VoyageAI</h3>
            <span>Smart travel planning platform</span>
          </div>
        </div>

        <nav className="topnav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/planner" className="nav-cta">
            Plan Trip
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">AI + ML + Maps + Travel Intelligence</span>
          <h1>Plan smarter trips with VoyageAI</h1>
          <p>
            Discover destinations, compare flights, explore hotels, view places
            on a map, and generate a complete itinerary with a polished,
            user-friendly travel experience.
          </p>

          <div className="hero-actions">
            <Link to="/planner" className="primaryBtn">
              Start Planning
            </Link>
            <a href="#features" className="secondaryBtn">
              Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div className="statCard">
              <strong>AI Itinerary</strong>
              <span>Day-by-day travel plans</span>
            </div>
            <div className="statCard">
              <strong>Flight ML</strong>
              <span>Fare prediction insights</span>
            </div>
            <div className="statCard">
              <strong>Map + Hotels</strong>
              <span>Places and stays in one view</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glassCard">
            <p className="miniTitle">Trip Snapshot</p>
            <h3>Colombo → Dubai</h3>
            <ul>
              <li>Weather insights</li>
              <li>Flights + fare forecast</li>
              <li>Hotels + places map</li>
              <li>AI-generated itinerary</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHeading">
          <span className="eyebrow">Features</span>
          <h2>Everything needed for an impressive travel planning experience</h2>
        </div>

        <div className="featureGrid">
          <article className="featureCard">
            <h3>Weather-aware planning</h3>
            <p>Make better travel decisions with destination weather insights.</p>
          </article>
          <article className="featureCard">
            <h3>Flight pricing insight</h3>
            <p>Understand current fare vs predicted fare using your ML model.</p>
          </article>
          <article className="featureCard">
            <h3>Hotel discovery</h3>
            <p>See suggested places to stay with clear cards and quick comparison.</p>
          </article>
          <article className="featureCard">
            <h3>Interactive places map</h3>
            <p>Explore attractions visually instead of reading raw JSON output.</p>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="sectionHeading">
          <span className="eyebrow">How it works</span>
          <h2>Simple flow, rich experience</h2>
        </div>

        <div className="steps">
          <div className="stepCard">
            <span>01</span>
            <h3>Enter trip details</h3>
            <p>Select origin, destination, and trip duration.</p>
          </div>
          <div className="stepCard">
            <span>02</span>
            <h3>Analyze travel data</h3>
            <p>Flights, weather, hotels, and places are gathered together.</p>
          </div>
          <div className="stepCard">
            <span>03</span>
            <h3>View a full dashboard</h3>
            <p>Get an elegant results page with all trip intelligence in one place.</p>
          </div>
        </div>
      </section>
    </div>
  )
}