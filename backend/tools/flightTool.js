import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function searchFlights(from,to){

try{

const key = process.env.AVIATIONSTACK_KEY

const res = await axios.get(
"http://api.aviationstack.com/v1/flights",
{
params:{
access_key:key
}
}
)

const flights = res.data.data || []

return flights.slice(0,5).map(f=>({

airline:f.airline?.name || "Airline",
flight:f.flight?.number || "N/A",
departure:from,
arrival:to,
price:Math.floor(Math.random()*400)+100

}))

}catch(err){

console.log("Flight API failed")

return [
{airline:"Air Asia",flight:"AX120",departure:from,arrival:to,price:250},
{airline:"Emirates",flight:"EK202",departure:from,arrival:to,price:350}
]

}

}