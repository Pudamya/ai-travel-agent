import axios from "axios"

export async function getWeather(city){

const key = process.env.WEATHER_API_KEY

const res = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
)

return `${res.data.main.temp}°C ${res.data.weather[0].description}`

}