import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"
import { predictFlightPrice } from "../tools/pricePredictionTool.js"

export async function runTravelPlanner(data){

console.log("Planner input:",data)

const weather = await getWeather(data.to)

const places = await searchPlaces(data.to)

const flights = await searchFlights(data.from,data.to)

const hotels = await searchHotels(data.to)

const image = await generateTravelImage(data.to)

const flightsWithPrediction = await Promise.all(

flights.map(async f=>{

const predicted = await predictFlightPrice({
airline:"Indigo",
source_city:data.from,
departure_time:"Morning",
stops:"zero",
arrival_time:"Night",
destination_city:data.to,
class:"Economy",
duration:120,
days_left:20
})

return{
...f,
predicted_price:predicted,
recommendation:
predicted > f.price
? "Book now"
: "Price stable"
}

})

)

const plan = await generatePlan({
weather,
places,
flights:flightsWithPrediction,
hotels
})

return{
weather,
places,
flights:flightsWithPrediction,
hotels,
image,
plan
}

}