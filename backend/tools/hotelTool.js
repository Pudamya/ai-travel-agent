import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function searchHotels(city){

try{

const res = await axios.get(
"https://booking-com.p.rapidapi.com/v1/hotels/search",
{
params:{
dest_type:"city",
dest_id:city
},
headers:{
"X-RapidAPI-Key":process.env.RAPIDAPI_KEY,
"X-RapidAPI-Host":"booking-com.p.rapidapi.com"
}
}
)

return res.data.result

}catch(err){

console.log("Hotel API failed")

return []

}

}