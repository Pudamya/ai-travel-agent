import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function getWeather(city){

try{

const res = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
)

return {
temperature: res.data.main.temp,
condition: res.data.weather[0].description
}

}catch(err){

console.log("Weather API failed")

return {
temperature: 28,
condition: "Sunny"
}

}

}