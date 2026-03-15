import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"
import { predictFlightPrice } from "../tools/pricePredictionTool.js"
import { getPlaceImage } from "../tools/placeImageTool.js"

export async function runTravelPlanner(data) {
  console.log("Planner input:", data)

  const weather = await getWeather(data.to)
  const places = await searchPlaces(data.to)
  const flights = await searchFlights(data.from, data.to)
  const hotels = await searchHotels(data.to)
  const image = await generateTravelImage(data.to)

  const enrichedPlaces = await Promise.all(
    (places || []).slice(0, 8).map(async (place, index) => {
      const placeImage = await getPlaceImage(`${place.name || data.to} ${data.to} attraction travel`)
      return {
        ...place,
        id: index,
        previewImage:
          placeImage ||
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

  return {
    weather,
    places: enrichedPlaces,
    flights: flightsWithPrediction,
    hotels,
    image,
    plan,
  }
}