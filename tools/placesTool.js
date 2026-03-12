import axios from "axios"

export async function searchPlaces(city){

const key = process.env.GOOGLE_MAPS_KEY

const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist attractions in ${city}&key=${key}`

const res = await axios.get(url)

return res.data.results
.slice(0,5)
.map(p => p.name)
.join("\n")

}