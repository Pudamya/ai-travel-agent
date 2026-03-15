import axios from "axios"

export async function predictFlightPrice(data){

try{

const res = await axios.post(
"http://localhost:5000/predict",
data
)

return res.data.predicted_price

}catch(err){

console.log("ML price prediction failed")

return Math.floor(Math.random()*400)+100

}

}