import { Link, useLocation } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import FlightCard from "../components/FlightCard"
import HotelCard from "../components/HotelCard"
import AgentPanel from "../components/AgentPanel"
import MapView from "../components/MapView"
import ItineraryTimeline from "../components/ItineraryTimeline"

function buildPlaceCards(places, destination, heroImage) {
  if (places?.length) {
    return places.slice(0, 8).map((place, index) => ({
      id: place.id ?? index,
      name: place.name || `${destination} Highlight`,
      subtitle:
        place.formatted_address ||
        place.vicinity ||
        place.address ||
        "Popular attraction",
      rating: place.rating || null,
      image:
        place.previewImage ||
        heroImage ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    }))
  }

  return [
    {
      id: 1,
      name: `${destination || "Destination"} City Center`,
      subtitle: "Explore the heart of the destination",
      image:
        heroImage ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      name: `${destination || "Destination"} Waterfront`,
      subtitle: "Scenic views and relaxed city walks",
      image:
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      name: `${destination || "Destination"} Landmarks`,
      subtitle: "Must-visit highlights and sightseeing spots",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      name: `${destination || "Destination"} Food & Culture`,
      subtitle: "Local dishes, markets, and cultural experiences",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    },
  ]
}

export default function Results() {
  const { state } = useLocation()
  const [activePlace, setActivePlace] = useState(0)

  if (!state) {
    return (
      <div className="page emptyStatePage">
        <div className="emptyStateCard">
          <h1>No trip results found</h1>
          <p>Please generate a trip first.</p>
          <Link to="/planner" className="primaryBtn">
            Go to Planner
          </Link>
        </div>
      </div>
    )
  }

  const {
    weather,
    flights = [],
    hotels = [],
    places = [],
    plan = "",
    image,
    from,
    to,
    days,
    startDate,
    endDate,
    itineraryDays = [],
  } = state

  const filteredFlights = flights.filter((flight) => {
    const airline = String(flight?.airline || "").trim().toLowerCase()
    const price = Number(flight?.price || 0)

    return airline && airline !== "empty" && airline !== "n/a" && price > 0
  })

  const heroImageUrl =
    image?.imageUrl ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"

  const placeCards = useMemo(() => {
    return buildPlaceCards(places, to || "Destination", heroImageUrl)
  }, [places, to, heroImageUrl])

  useEffect(() => {
    if (activePlace > placeCards.length - 1) {
      setActivePlace(0)
    }
  }, [activePlace, placeCards])

  const activePlaceCard = placeCards[activePlace] || placeCards[0]

  function prevPlace() {
    setActivePlace((prev) => (prev === 0 ? placeCards.length - 1 : prev - 1))
  }

  function nextPlace() {
    setActivePlace((prev) => (prev === placeCards.length - 1 ? 0 : prev + 1))
  }

  function handlePlaceImageError(e) {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  }

  return (
    <div className="page page-results">
      <header className="resultsHero">
        <div className="resultsHeroCopy">
          <Link to="/planner" className="backLink">
            ← Edit trip
          </Link>

          <span className="eyebrow">VoyageAI Results</span>

          <h1>
            {from || "Origin"} → {to || "Destination"}
          </h1>

          <p>
            {days || 0}-day AI travel plan with weather, flights, nearby stays,
            attractions, map view, and itinerary intelligence.
          </p>

          {(startDate || endDate) && (
            <div className="travelWindowText">
              Travel window: {startDate || "--"} → {endDate || "--"}
            </div>
          )}

          <div className="summaryChips">
            <span className="chip">Weather Ready</span>
            <span className="chip">ML Flight Insight</span>
            <span className="chip">Nearby Stays</span>
            <span className="chip">Itinerary Generated</span>
          </div>
        </div>

        <div className="heroImageCard">
          <img
            src={heroImageUrl}
            alt={`${to || "Destination"} travel`}
            className="heroImage"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
            }}
          />

          {image?.photographer ? (
            <p className="imageCredit">
              Photo by{" "}
              <a
                href={image.photographerUrl || "https://unsplash.com"}
                target="_blank"
                rel="noreferrer"
              >
                {image.photographer}
              </a>{" "}
              on{" "}
              <a
                href={image.unsplashUrl || "https://unsplash.com"}
                target="_blank"
                rel="noreferrer"
              >
                Unsplash
              </a>
            </p>
          ) : null}
        </div>
      </header>

      <section className="dashboardGrid">
        <div className="mainColumn">
          <div className="sectionCard weatherCard">
            <div className="sectionHeader">
              <h2>Destination Weather</h2>
              <span className="sectionBadge">Travel context</span>
            </div>

            <div className="weatherStats">
              <div className="weatherStat">
                <span className="label">Average Temperature</span>
                <strong>{weather?.temperature ?? "--"}°C</strong>
              </div>

              <div className="weatherStat">
                <span className="label">Condition</span>
                <strong>{weather?.condition ?? "Unavailable"}</strong>
              </div>
            </div>

            {weather?.travelForecast?.length ? (
              <div className="travelForecastGrid">
                {weather.travelForecast.map((day, index) => (
                  <div className="forecastDayCard" key={index}>
                    <span className="label">{day.date}</span>
                    <strong>{day.temperature}°C</strong>
                    <p>{day.condition}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>Flights</h2>
              <span className="sectionBadge">Current fare vs ML estimate</span>
            </div>

            <div className="cardsGrid">
              {filteredFlights.length ? (
                filteredFlights.map((flight, index) => (
                  <FlightCard key={index} flight={flight} />
                ))
              ) : (
                <div className="emptyInline">No valid flight results available.</div>
              )}
            </div>
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>Nearby Stays</h2>
              <span className="sectionBadge">Hotels near your travel area</span>
            </div>

            <p className="sectionSubtext">
              These stays are suggested for convenient access to the destination
              and its nearby attractions.
            </p>

            <div className="cardsGrid">
              {hotels.length ? (
                hotels.map((hotel, index) => (
                  <HotelCard key={index} hotel={hotel} />
                ))
              ) : (
                <div className="emptyInline">No hotel results available.</div>
              )}
            </div>
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>AI Itinerary</h2>
              <span className="sectionBadge">1 day = 1 slide</span>
            </div>

            <ItineraryTimeline
              plan={plan}
              destination={to || "Destination"}
              heroImage={heroImageUrl}
              itineraryDays={itineraryDays}
            />
          </div>
        </div>

        <aside className="sideColumn">
          <AgentPanel />

          <div className="sectionCard mapCard">
            <div className="sectionHeader">
              <h2>Places Map</h2>
              <span className="sectionBadge">Explore attractions</span>
            </div>

            <MapView places={places} />
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>Places Preview</h2>
              <span className="sectionBadge">Scenic highlights</span>
            </div>

            <div className="placesSlider">
              <div className="placesPreviewHero">
                <img
                  src={activePlaceCard?.image}
                  alt={activePlaceCard?.name || "Place"}
                  className="placesPreviewImage"
                  onError={handlePlaceImageError}
                />
                <div className="placesPreviewOverlay">
                  <h3>{activePlaceCard?.name}</h3>
                  <p>{activePlaceCard?.subtitle}</p>
                  {activePlaceCard?.rating ? (
                    <span className="placesRating">
                      ⭐ {activePlaceCard.rating}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="placesPreviewControls">
                <button type="button" className="sliderBtn" onClick={prevPlace}>
                  ←
                </button>
                <span className="slideCounter">
                  {activePlace + 1} / {placeCards.length}
                </span>
                <button type="button" className="sliderBtn" onClick={nextPlace}>
                  →
                </button>
              </div>

              <div className="placesThumbRow">
                {placeCards.map((place, index) => (
                  <button
                    key={place.id}
                    type="button"
                    className={`placeThumb ${index === activePlace ? "active" : ""}`}
                    onClick={() => setActivePlace(index)}
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      onError={handlePlaceImageError}
                    />
                    <span>{place.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}