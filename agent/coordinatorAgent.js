import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generatePlan } from "./plannerAgent.js"

export async function runTravelPlanner(city){

const weather = await getWeather(city)

const places = await searchPlaces(city)

const flights = await searchFlights(city)

const hotels = await searchHotels(city)

const plan = await generatePlan({
weather,
places,
flights,
hotels
})

return plan

}