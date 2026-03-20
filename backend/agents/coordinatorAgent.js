import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"
import { predictFlightPrice } from "../tools/pricePredictionTool.js"
import { getPlaceImage } from "../tools/placeImageTool.js"

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

function parseItineraryDays(plan) {
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
      }
    })
  }

  const lines = normalized
    .split("\n")
    .map(cleanLine)
    .filter(isUsefulLine)

  return lines.length
    ? [{ id: 0, title: "Trip Overview", items: lines }]
    : []
}

function buildThemedQuery(destination, dayTitle, dayItems = []) {
  const text = `${dayTitle} ${(dayItems || []).join(" ")}`.toLowerCase()

  if (text.includes("museum") || text.includes("gallery") || text.includes("architecture")) {
    return `${destination} museum architecture landmark travel`
  }
  if (
    text.includes("beach") ||
    text.includes("coast") ||
    text.includes("sea") ||
    text.includes("bay") ||
    text.includes("cliff") ||
    text.includes("island")
  ) {
    return `${destination} beach coast ocean cliff travel`
  }
  if (
    text.includes("shopping") ||
    text.includes("market") ||
    text.includes("souvenir") ||
    text.includes("mall")
  ) {
    return `${destination} shopping market street travel`
  }
  if (
    text.includes("food") ||
    text.includes("restaurant") ||
    text.includes("cafe") ||
    text.includes("dinner") ||
    text.includes("lunch") ||
    text.includes("breakfast") ||
    text.includes("seafood")
  ) {
    return `${destination} food street local cuisine travel`
  }
  if (
    text.includes("park") ||
    text.includes("garden") ||
    text.includes("nature") ||
    text.includes("walk")
  ) {
    return `${destination} park garden nature travel`
  }
  if (
    text.includes("mosque") ||
    text.includes("temple") ||
    text.includes("church") ||
    text.includes("cathedral")
  ) {
    return `${destination} temple mosque church landmark travel`
  }
  if (
    text.includes("night") ||
    text.includes("skyline") ||
    text.includes("city lights")
  ) {
    return `${destination} skyline night city travel`
  }
  if (
    text.includes("arrival") ||
    text.includes("check in") ||
    text.includes("check-in")
  ) {
    return `${destination} skyline city center travel`
  }
  if (
    text.includes("departure") ||
    text.includes("farewell") ||
    text.includes("airport")
  ) {
    return `${destination} scenic farewell travel`
  }

  return `${destination} sightseeing attraction travel`
}

function fallbackDayImage(index, heroImage) {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  ]

  return (
    heroImage ||
    images[index % images.length] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  )
}

function extractRelevantPlaces(dayTitle, dayItems = [], allPlaces = [], destination = "") {
  const haystack = `${dayTitle} ${(dayItems || []).join(" ")}`.toLowerCase()

  const matched = (allPlaces || []).filter((place) => {
    const name = String(place?.name || "").toLowerCase().trim()
    if (!name) return false

    if (haystack.includes(name)) return true

    const tokens = name.split(/\s+/).filter((t) => t.length > 3)
    return tokens.some((token) => haystack.includes(token))
  })

  if (matched.length) return matched.slice(0, 4)
  if (allPlaces?.length) return allPlaces.slice(0, 4)

  return [
    { name: `${destination} City Center` },
    { name: `${destination} Landmark` },
    { name: `${destination} Food Street` },
  ]
}

function pickValue(options) {
  return options[Math.floor(Math.random() * options.length)]
}

function deriveDurationHours(flight) {
  const direct =
    Number(flight?.duration_hours) ||
    Number(flight?.duration) ||
    Number(flight?.durationHours)

  if (Number.isFinite(direct) && direct > 0) {
    return Number(direct)
  }

  const price = Number(flight?.price || 0)

  if (price < 180) return Number((2 + Math.random() * 2).toFixed(2))
  if (price < 300) return Number((4 + Math.random() * 3).toFixed(2))
  if (price < 500) return Number((7 + Math.random() * 4).toFixed(2))
  return Number((10 + Math.random() * 5).toFixed(2))
}

function deriveStops(flight) {
  if (flight?.stops) return String(flight.stops).trim()
  return Math.random() > 0.55 ? "zero" : "one"
}

function deriveDepartureTime(flight) {
  if (flight?.departure_time) return String(flight.departure_time).trim()
  return pickValue(["Morning", "Afternoon", "Evening"])
}

function deriveArrivalTime(flight) {
  if (flight?.arrival_time) return String(flight.arrival_time).trim()
  return pickValue(["Morning", "Afternoon", "Evening", "Night"])
}

function deriveTravelClass(flight) {
  if (flight?.class) return String(flight.class).trim()
  return Math.random() > 0.82 ? "Business" : "Economy"
}

function deriveDaysLeft(data) {
  if (Number.isFinite(Number(data?.days_left))) {
    return Number(data.days_left)
  }

  if (data?.startDate) {
    const today = new Date()
    const tripStart = new Date(data.startDate)
    const diff = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24))
    if (Number.isFinite(diff)) {
      return Math.max(1, diff)
    }
  }

  return 14
}

export async function runTravelPlanner(data) {
  console.log("Planner input:", data)

  const weather = await getWeather(data.to, data.startDate, data.endDate)
  const places = await searchPlaces(data.to)
  const rawFlights = await searchFlights(data.from, data.to)
  const hotels = await searchHotels(data.to)
  const image = await generateTravelImage(data.to)

  const enrichedPlaces = await Promise.all(
    (places || []).slice(0, 8).map(async (place, index) => {
      const placeImage = await getPlaceImage(
        `${place.name || data.to} ${data.to} attraction travel`,
        index + 1
      )

      return {
        ...place,
        id: place.id ?? index,
        previewImage: placeImage || fallbackDayImage(index, image?.imageUrl),
      }
    })
  )

  const flights = (rawFlights || []).filter((f) => {
    const airline = String(f?.airline || "").trim().toLowerCase()
    const departure = String(f?.departure || data.from || "").trim()
    const arrival = String(f?.arrival || data.to || "").trim()
    const price = Number(f?.price || 0)

    return (
      airline &&
      airline !== "empty" &&
      airline !== "n/a" &&
      departure &&
      arrival &&
      price > 0
    )
  })

  const flightsWithPrediction = await Promise.all(
    flights.map(async (f) => {
      const durationHours = deriveDurationHours(f)
      const predictionInput = {
        airline: f.airline || "Global Airways",
        source_city: data.from,
        departure_time: deriveDepartureTime(f),
        stops: deriveStops(f),
        arrival_time: deriveArrivalTime(f),
        destination_city: data.to,
        class: deriveTravelClass(f),
        duration: durationHours,
        days_left: deriveDaysLeft(data),
      }

      const predicted = await predictFlightPrice(predictionInput)
      const finalPrediction = Number(
        (Number.isFinite(Number(predicted)) ? Number(predicted) : 250).toFixed(2)
      )

      return {
        ...f,
        departure: f.departure || data.from,
        arrival: f.arrival || data.to,
        departure_time: predictionInput.departure_time,
        arrival_time: predictionInput.arrival_time,
        stops: predictionInput.stops,
        class: predictionInput.class,
        duration_hours: durationHours,
        predicted_price: finalPrediction,
        recommendation:
          finalPrediction > Number(f.price || 0) ? "Book now" : "Price stable",
      }
    })
  )

  const plan = await generatePlan({
    from: data.from,
    to: data.to,
    days: data.days,
    startDate: data.startDate,
    endDate: data.endDate,
    weather,
    places: enrichedPlaces,
    flights: flightsWithPrediction,
    hotels,
  })

  const parsedDays = parseItineraryDays(plan)

  const itineraryDays = await Promise.all(
    parsedDays.map(async (day, index) => {
      const themedQuery = buildThemedQuery(data.to, day.title, day.items)
      const dayImage = await getPlaceImage(themedQuery, index + 1)

      const relevantPlaces = extractRelevantPlaces(
        day.title,
        day.items,
        enrichedPlaces,
        data.to
      )

      const placeImages = await Promise.all(
        relevantPlaces.slice(0, 4).map(async (place, placeIndex) => {
          const img =
            place.previewImage ||
            (await getPlaceImage(
              `${place.name || data.to} ${data.to} attraction travel`,
              placeIndex + 1
            ))

          return {
            name: place.name || `${data.to} Highlight`,
            image: img || fallbackDayImage(placeIndex, image?.imageUrl),
          }
        })
      )

      return {
        id: index,
        title: day.title,
        items: (day.items || []).filter(isUsefulLine),
        image: dayImage || fallbackDayImage(index, image?.imageUrl),
        placeImages,
      }
    })
  )

  return {
    weather,
    places: enrichedPlaces,
    flights: flightsWithPrediction,
    hotels,
    image,
    plan,
    itineraryDays,
  }
}