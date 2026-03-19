import { useEffect, useMemo, useState } from "react"

function cleanLine(line) {
  return String(line || "")
    .replace(/^[-*]\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/, "")
    .replace(/^--+$/, "")
    .replace(/^—+$/, "")
    .replace(/\s+/g, " ")
    .trim()
}

function isUsefulLine(line) {
  if (!line) return false

  const lower = line.toLowerCase()

  if (lower === "--" || lower === "---" || lower === "—") return false
  if (lower === "n/a") return false
  if (lower.length < 2) return false

  return true
}

function fallbackImages() {
  return [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  ]
}

function parseSlidesFromPlan(plan, heroImage, destination) {
  if (!plan || typeof plan !== "string") return []

  const normalized = plan.replace(/\r/g, "").trim()
  const dayRegex = /(Day\s*\d+\s*:[\s\S]*?)(?=Day\s*\d+\s*:|$)/gi
  const matches = [...normalized.matchAll(dayRegex)]

  if (matches.length) {
    return matches.map((match, index) => {
      const block = match[0].trim()
      const lines = block
        .split("\n")
        .map(cleanLine)
        .filter(isUsefulLine)

      return {
        id: index,
        title: lines[0] || `Day ${index + 1}`,
        items: lines.slice(1),
        image: heroImage || fallbackImages()[index % fallbackImages().length],
        placeImages: [],
        destination,
      }
    })
  }

  const lines = normalized
    .split("\n")
    .map(cleanLine)
    .filter(isUsefulLine)

  return lines.length
    ? [
        {
          id: 0,
          title: "Trip Overview",
          items: lines,
          image: heroImage || fallbackImages()[0],
          placeImages: [],
          destination,
        },
      ]
    : []
}

function normalizeBackendSlides(itineraryDays, heroImage, destination) {
  if (!Array.isArray(itineraryDays) || !itineraryDays.length) return []

  return itineraryDays.map((day, index) => ({
    id: day.id ?? index,
    title: cleanLine(day.title || `Day ${index + 1}`),
    items: Array.isArray(day.items)
      ? day.items.map(cleanLine).filter(isUsefulLine)
      : [],
    image:
      day.image ||
      heroImage ||
      fallbackImages()[index % fallbackImages().length],
    placeImages: Array.isArray(day.placeImages) ? day.placeImages : [],
    destination,
  }))
}

export default function ItineraryTimeline({
  plan,
  destination = "travel",
  heroImage,
  itineraryDays = [],
}) {
  const slides = useMemo(() => {
    const backendSlides = normalizeBackendSlides(
      itineraryDays,
      heroImage,
      destination
    )

    if (backendSlides.length > 1) return backendSlides

    const parsedSlides = parseSlidesFromPlan(plan, heroImage, destination)

    if (parsedSlides.length > 1) return parsedSlides

    if (backendSlides.length === 1 && parsedSlides.length <= 1) return backendSlides

    return parsedSlides
  }, [itineraryDays, plan, heroImage, destination])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!slides.length) {
      setActiveIndex(0)
      return
    }

    if (activeIndex > slides.length - 1) {
      setActiveIndex(0)
    }
  }, [slides, activeIndex])

  if (!slides.length) {
    return <div className="emptyInline">No itinerary available.</div>
  }

  const activeDay = slides[activeIndex]

  function goPrev() {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  function goNext() {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  function handleImageError(e) {
    e.currentTarget.src =
      heroImage ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  }

  return (
    <div className="itinerarySlider">
      <div className="itineraryTopBar">
        <div>
          <span className="eyebrow">Smart itinerary view</span>
          <h3 className="itineraryHeading">{activeDay.title}</h3>
        </div>

        <div className="sliderControls">
          <button type="button" className="sliderBtn" onClick={goPrev}>
            ←
          </button>
          <span className="slideCounter">
            {activeIndex + 1} / {slides.length}
          </span>
          <button type="button" className="sliderBtn" onClick={goNext}>
            →
          </button>
        </div>
      </div>

      <div className="itinerarySlideCard">
        <div className="itineraryImageWrap">
          <img
            src={activeDay.image}
            alt={`${destination} ${activeDay.title}`}
            className="itineraryImage"
            onError={handleImageError}
          />
          <div className="itineraryImageOverlay">
            <span>{destination}</span>
            <strong>{activeDay.title}</strong>
          </div>
        </div>

        <div className="itineraryContentWrap">
          {activeDay.placeImages?.length ? (
            <div className="dayPlacesStrip">
              {activeDay.placeImages.map((place, index) => (
                <div className="dayPlaceCard" key={index}>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="dayPlaceImage"
                    onError={handleImageError}
                  />
                  <span className="dayPlaceName">{place.name}</span>
                </div>
              ))}
            </div>
          ) : null}

          {activeDay.items?.length ? (
            <div className="itineraryBullets">
              {activeDay.items.map((item, index) => (
                <div key={index} className="itineraryBullet">
                  <div className="bulletIndex">{index + 1}</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyInline">No itinerary details available.</div>
          )}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="sliderDots">
          {slides.map((day, index) => (
            <button
              key={day.id ?? index}
              type="button"
              className={`sliderDot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={day.title}
              title={day.title}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}