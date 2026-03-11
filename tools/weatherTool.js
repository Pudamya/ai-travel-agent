import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function getWeather(city) {

  const key = process.env.WEATHER_API_KEY

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  )

  return {
    temp: response.data.main.temp,
    condition: response.data.weather[0].description
  }
}