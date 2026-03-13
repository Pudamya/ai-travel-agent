import axios from "axios"

export async function searchHotels(city){

const res = await axios.get(
"https://booking-com.p.rapidapi.com/v1/hotels/search",
{
headers:{
"X-RapidAPI-Key":process.env.RAPID_API_KEY
},
params:{
dest_type:"city",
dest_id:city
}
}
)

return res.data.result.slice(0,5)

}