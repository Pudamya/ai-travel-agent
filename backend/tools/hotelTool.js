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

return (res.data.result || []).slice(0,5).map(h=>({
name:h.hotel_name,
rating:h.review_score,
price:h.min_total_price
}))

}catch(err){

console.log("Hotel API failed")

return [
{name:"Hilton Hotel",rating:4.5,price:120},
{name:"Marriott Hotel",rating:4.3,price:110},
{name:"City Grand Hotel",rating:4.1,price:90}
]

}

}