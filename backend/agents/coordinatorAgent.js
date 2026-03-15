import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"
import { predictFlightPrice } from "../tools/pricePredictionTool.js"
import { getPlaceImage } from "../tools/placeImageTool.js"

function cleanLine(line) {
  return line
    .replace(/^[-*]\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/, "")
    .trim()
}

function parseItineraryDays(plan) {
  if (!plan || typeof plan !== "string") return []

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
  return sections
}

export async function runTravelPlanner(data) {
  console.log("Planner input:", data)

  const weather = await getWeather(data.to)
  const places = await searchPlaces(data.to)
  const flights = await searchFlights(data.from, data.to)
  const hotels = await searchHotels(data.to)
  const image = await generateTravelImage(data.to)

  const enrichedPlaces = await Promise.all(
    (places || []).slice(0, 8).map(async (place, index) => {
      const placeImage = await getPlaceImage(
        `${place.name || data.to} ${data.to} attraction travel`
      )

      return {
        ...place,
        id: index,
        previewImage:
          placeImage ||
          image?.imageUrl ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      }
    })
  )

  const flightsWithPrediction = await Promise.all(
    flights.map(async (f) => {
      const predicted = await predictFlightPrice({
        airline: f.airline || "Indigo",
        source_city: data.from,
        departure_time: "Morning",
        stops: "zero",
        arrival_time: "Night",
        destination_city: data.to,
        class: "Economy",
        duration: 120,
        days_left: 20,
      })

      return {
        ...f,
        predicted_price: predicted,
        recommendation:
          predicted > Number(f.price || 0) ? "Book now" : "Price stable",
      }
    })
  )

  const plan = await generatePlan({
    from: data.from,
    to: data.to,
    days: data.days,
    weather,
    places: enrichedPlaces,
    flights: flightsWithPrediction,
    hotels,
  })

  const parsedDays = parseItineraryDays(plan)

  const fallbackDayImages = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  ]

  const itineraryDays = await Promise.all(
    parsedDays.map(async (day, index) => {
      const keywords = (day.items || []).join(" ").toLowerCase()

      let themedQuery = `${data.to} travel sightseeing`

      if (keywords.includes("museum")) {
        themedQuery = `${data.to} museum architecture travel`
      } else if (keywords.includes("beach")) {
        themedQuery = `${data.to} beach travel`
      } else if (keywords.includes("market") || keywords.includes("shopping")) {
        themedQuery = `${data.to} shopping market travel`
      } else if (keywords.includes("food") || keywords.includes("restaurant") || keywords.includes("cafe")) {
        themedQuery = `${data.to} food street local cuisine travel`
      } else if (keywords.includes("park") || keywords.includes("garden")) {
        themedQuery = `${data.to} park garden travel`
      } else if (keywords.includes("mosque") || keywords.includes("temple") || keywords.includes("church")) {
        themedQuery = `${data.to} landmark temple mosque church travel`
      } else if (keywords.includes("night") || keywords.includes("skyline")) {
        themedQuery = `${data.to} skyline night city travel`
      } else if (keywords.includes("arrival") || keywords.includes("check in")) {
        themedQuery = `${data.to} skyline city center travel`
      }

      const dayImage = await getPlaceImage(themedQuery, index + 1)

      return {
        id: index,
        title: day.title,
        items: day.items,
        image:
          dayImage ||
          fallbackDayImages[index % fallbackDayImages.length] ||
          image?.imageUrl ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
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