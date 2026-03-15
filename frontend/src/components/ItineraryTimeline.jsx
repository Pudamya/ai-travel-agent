import { useEffect, useMemo, useState } from "react"

function cleanLine(line) {
  return line
    .replace(/^[-*]\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/, "")
    .trim()
}

function parseFallbackItinerary(plan, fallbackImage, destination) {
  if (!plan || typeof plan !== "string") return []

  const fallbackImages = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  ]

  const lines = plan
    .split("\n")
    .map(cleanLine)
    .filter(Boolean)
    .filter((line) => line !== "---" && line !== "—")

  const dayHeaderRegex = /^day\s*\d+[:\-\s]/i
  const sections = []
  let current = null

  for (const line of lines) {
    if (dayHeaderRegex.test(line)) {
      if (current) sections.push(current)
      current = {
        title: line,
        items: [],
      }
    } else {
      if (!current) {
        current = {
          title: "Trip Overview",
          items: [],
        }
      }
      current.items.push(line)
    }
  }

  if (current) sections.push(current)

  return sections.map((section, index) => ({
    id: index,
    title: section.title,
    items: section.items,
    image:
      fallbackImage ||
      fallbackImages[index % fallbackImages.length] ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
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
    if (Array.isArray(itineraryDays) && itineraryDays.length) {
      return itineraryDays.map((day, index) => ({
        ...day,
        image:
          day.image ||
          heroImage ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        id: day.id ?? index,
      }))
    }

    return parseFallbackItinerary(plan, heroImage, destination)
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
          {Array.isArray(activeDay.items) && activeDay.items.length ? (
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
    </div>
  )
}