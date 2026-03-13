import axios from "axios"

export async function searchFlights(from, to){

const key = process.env.AMADEUS_KEY

const url = `https://api.amadeus.com/v2/shopping/flight-offers`

const res = await axios.get(url,{
params:{
originLocationCode:from,
destinationLocationCode:to,
adults:1
},
headers:{
Authorization:`Bearer ${key}`
}
})

return res.data.data.slice(0,3).map(f=>({
airline:f.validatingAirlineCodes[0],
price:f.price.total,
duration:f.itineraries[0].duration
}))

}