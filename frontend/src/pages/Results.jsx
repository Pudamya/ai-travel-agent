import { Link, useLocation } from "react-router-dom"
import { useMemo, useState } from "react"
import FlightCard from "../components/FlightCard"
import HotelCard from "../components/HotelCard"
import AgentPanel from "../components/AgentPanel"
import MapView from "../components/MapView"
import ItineraryTimeline from "../components/ItineraryTimeline"

function buildPlaceCards(places, destination) {
  if (places?.length) {
    return places.slice(0, 8).map((place, index) => ({
      id: index,
      name: place.name || `${destination} Highlight`,
      subtitle:
        place.formatted_address ||
        place.vicinity ||
        place.address ||
        "Popular attraction",
      rating: place.rating || null,
      image: `https://source.unsplash.com/900x700/?${encodeURIComponent(
        `${place.name || destination} ${destination} attraction travel`
      )}`,
    }))
  }

  return [
    {
      id: 1,
      name: `${destination} City Center`,
      subtitle: "Explore the heart of the destination",
      image: `https://source.unsplash.com/900x700/?${encodeURIComponent(
        `${destination} city center travel`
      )}`,
    },
    {
      id: 2,
      name: `${destination} Waterfront`,
      subtitle: "Scenic views and relaxed city walks",
      image: `https://source.unsplash.com/900x700/?${encodeURIComponent(
        `${destination} waterfront travel`
      )}`,
    },
    {
      id: 3,
      name: `${destination} Landmarks`,
      subtitle: "Must-visit highlights and sightseeing spots",
      image: `https://source.unsplash.com/900x700/?${encodeURIComponent(
        `${destination} landmarks travel`
      )}`,
    },
    {
      id: 4,
      name: `${destination} Food & Culture`,
      subtitle: "Local dishes, markets, and cultural experiences",
      image: `https://source.unsplash.com/900x700/?${encodeURIComponent(
        `${destination} food culture travel`
      )}`,
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
  } = state

  const placeCards = useMemo(() => {
  if (places?.length) {
    return places.slice(0, 8).map((place, index) => ({
      id: place.id ?? index,
      name: place.name || `${to} Highlight`,
      subtitle:
        place.formatted_address ||
        place.vicinity ||
        place.address ||
        "Popular attraction",
      rating: place.rating || null,
      image:
        place.previewImage ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    }))
  }

  return [
    {
      id: 1,
      name: `${to} City Center`,
      subtitle: "Explore the heart of the destination",
      image: image?.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
  ]
  }, [places, to, image])

  const activePlaceCard = placeCards[activePlace] || placeCards[0]

  function prevPlace() {
    setActivePlace((prev) => (prev === 0 ? placeCards.length - 1 : prev - 1))
  }

  function nextPlace() {
    setActivePlace((prev) => (prev === placeCards.length - 1 ? 0 : prev + 1))
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
            {days || 0}-day AI travel plan with weather, flights, hotels,
            attractions, map view, and itinerary intelligence.
          </p>

          <div className="summaryChips">
            <span className="chip">Weather Ready</span>
            <span className="chip">ML Flight Insight</span>
            <span className="chip">Hotel Discovery</span>
            <span className="chip">Itinerary Generated</span>
          </div>
        </div>

        <div className="heroImageCard">
          {image?.imageUrl ? (
            <>
              <img
                src={image.imageUrl}
                alt={`${to || "Destination"} travel`}
                className="heroImage"
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
            </>
          ) : (
            <div className="imageFallback">Destination Image</div>
          )}
        </div>
      </header>

      <section className="dashboardGrid">
        <div className="mainColumn">
          <div className="sectionCard weatherCard">
            <div className="sectionHeader">
              <h2>Destination Weather</h2>
              <span className="sectionBadge">Live travel context</span>
            </div>

            <div className="weatherStats">
              <div className="weatherStat">
                <span className="label">Temperature</span>
                <strong>{weather?.temperature ?? "--"}°C</strong>
              </div>

              <div className="weatherStat">
                <span className="label">Condition</span>
                <strong>{weather?.condition ?? "Unavailable"}</strong>
              </div>
            </div>
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>Flights</h2>
              <span className="sectionBadge">Current fare vs ML estimate</span>
            </div>

            <div className="cardsGrid">
              {flights.length ? (
                flights.map((flight, index) => (
                  <FlightCard key={index} flight={flight} />
                ))
              ) : (
                <div className="emptyInline">No flight results available.</div>
              )}
            </div>
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <h2>Hotels</h2>
              <span className="sectionBadge">Suggested stays</span>
            </div>

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
              <span className="sectionBadge">Interactive day slider</span>
            </div>

            <ItineraryTimeline
                plan={plan}
                destination={to || "Destination"}
                heroImage={image?.imageUrl}
                itineraryDays={state.itineraryDays || []}
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
                  src={activePlaceCard.image}
                  alt={activePlaceCard.name}
                  className="placesPreviewImage"
                />
                <div className="placesPreviewOverlay">
                  <h3>{activePlaceCard.name}</h3>
                  <p>{activePlaceCard.subtitle}</p>
                  {activePlaceCard.rating ? (
                    <span className="placesRating">⭐ {activePlaceCard.rating}</span>
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
                    <img src={place.image} alt={place.name} />
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