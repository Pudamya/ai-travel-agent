import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"

export async function runTravelPlanner(data){

const weather = await getWeather(data.to)

const places = await searchPlaces(data.to)

const flights = await searchFlights(data.from, data.to)

const hotels = await searchHotels(data.to)

const image = await generateTravelImage(data.to)

const plan = await generatePlan({
weather,
places,
flights,
hotels,
image
})

return {
weather,
places,
flights,
hotels,
image,
plan
}

}