import axios from "axios"

export async function getWeather(city){

try{

const res = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b4ba85b33102a827c541e2d10b7c2c5&units=metric`
)

return {
temperature: res.data.main.temp,
condition: res.data.weather[0].description
}

}catch(error){

console.log("Weather API failed — using fallback")

return {
temperature: 28,
condition: "Sunny"
}

}

}