import { Link } from "react-router-dom"
import { Plane, MapPinned, Hotel, Sparkles, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="page page-home">
      <header className="topbar">
        <div className="brand">
          <div className="brand-logoWrap">
            <img
              src="/voyageai-logo.jpeg"
              alt="VoyageAI logo"
              className="brand-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                const fallback = e.currentTarget.nextElementSibling
                if (fallback) fallback.style.display = "grid"
              }}
            />
            <div className="brand-badge brand-badge-fallback">V</div>
          </div>

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
          <div className="tripSnapshotCard">
            <div className="tripSnapshotTop">
              <div>
                <span className="tripSnapshotLabel">Featured Travel Preview</span>
                <h3>VoyageAI Trip Snapshot</h3>
              </div>
              <div className="tripSnapshotPill">Live Demo Style</div>
            </div>

            <div className="tripRouteCard">
              <div className="tripRouteCity">
                <span>From</span>
                <strong>Colombo</strong>
              </div>

              <div className="tripRouteArrow">
                <ArrowRight size={18} />
              </div>

              <div className="tripRouteCity">
                <span>To</span>
                <strong>Dubai</strong>
              </div>
            </div>

            <div className="tripSnapshotGrid">
              <div className="tripSnapshotItem">
                <div className="tripSnapshotIcon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong>AI itinerary</strong>
                  <span>Smart day-by-day travel flow</span>
                </div>
              </div>

              <div className="tripSnapshotItem">
                <div className="tripSnapshotIcon">
                  <Plane size={18} />
                </div>
                <div>
                  <strong>Flight insight</strong>
                  <span>Estimated fare + ML prediction</span>
                </div>
              </div>

              <div className="tripSnapshotItem">
                <div className="tripSnapshotIcon">
                  <Hotel size={18} />
                </div>
                <div>
                  <strong>Nearby stays</strong>
                  <span>Hotels near places to visit</span>
                </div>
              </div>

              <div className="tripSnapshotItem">
                <div className="tripSnapshotIcon">
                  <MapPinned size={18} />
                </div>
                <div>
                  <strong>Places map</strong>
                  <span>Visual attraction discovery</span>
                </div>
              </div>
            </div>

            <div className="tripSnapshotBottom">
              <div className="tripMiniMetric">
                <span>Duration</span>
                <strong>5 Days</strong>
              </div>
              <div className="tripMiniMetric">
                <span>Style</span>
                <strong>City + Leisure</strong>
              </div>
              <div className="tripMiniMetric">
                <span>Experience</span>
                <strong>Premium UI</strong>
              </div>
            </div>
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
            <p>Understand estimated fare vs predicted fare using your ML model.</p>
          </article>
          <article className="featureCard">
            <h3>Hotel discovery</h3>
            <p>See suggested places to stay with clear cards and quick comparison.</p>
          </article>
          <article className="featureCard">
            <h3>Interactive places map</h3>
            <p>Explore attractions visually instead of reading raw output.</p>
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