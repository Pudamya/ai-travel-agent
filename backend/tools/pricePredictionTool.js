import axios from "axios"

export async function predictFlightPrice(data){

const res = await axios.post(
"http://localhost:5000/predict",
data
)

return res.data.predicted_price

}