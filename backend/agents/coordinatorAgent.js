import { getWeather } from "../tools/weatherTool.js"
import { searchPlaces } from "../tools/placesTool.js"
import { searchFlights } from "../tools/flightTool.js"
import { searchHotels } from "../tools/hotelTool.js"
import { generateTravelImage } from "../tools/imageTool.js"
import { generatePlan } from "./plannerAgent.js"
import { predictFlightPrice } from "../tools/pricePredictionTool.js"


export async function runTravelPlanner(data){

const weather = await getWeather(data.to)

const places = await searchPlaces(data.to)

const flights = await searchFlights(data.from, data.to)

const hotels = await searchHotels(data.to)

const image = await generateTravelImage(data.to)


// Predict price for each flight
const flightsWithPrediction = await Promise.all(

flights.map(async (flight)=>{

const predictedPrice = await predictFlightPrice({

airline: flight.airline || "Indigo",
source_city: data.from,
departure_time: "Morning",
stops: "zero",
arrival_time: "Night",
destination_city: data.to,
class: "Economy",
duration: flight.duration || 120,
days_left: 20

})

let recommendation = "Price stable"

if(predictedPrice > flight.price){
recommendation = "Book now — price likely to increase"
}

if(predictedPrice < flight.price){
recommendation = "Wait — price may decrease"
}

return {
...flight,
predicted_price: predictedPrice,
recommendation
}

})

)


// Generate AI travel plan
const plan = await generatePlan({
weather,
places,
flights: flightsWithPrediction,
hotels,
image
})


return {

weather,
places,
flights: flightsWithPrediction,
hotels,
image,
plan

}

}