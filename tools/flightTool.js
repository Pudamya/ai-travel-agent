import axios from "axios"

export async function searchFlights(city){

const key = process.env.FLIGHT_API_KEY

const res = await axios.get(
`http://api.aviationstack.com/v1/flights?access_key=${key}`
)

return "Example flight data retrieved"

}