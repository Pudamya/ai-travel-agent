import axios from "axios"

export async function searchFlights(from,to){

const key = process.env.AVIATIONSTACK_KEY

const res = await axios.get(
`http://api.aviationstack.com/v1/flights`,
{
params:{
access_key:key,
dep_iata:from,
arr_iata:to
}
}
)

return res.data.data.slice(0,5).map(f=>({

airline:f.airline.name,
flight:f.flight.number,
departure:f.departure.airport,
arrival:f.arrival.airport

}))

}