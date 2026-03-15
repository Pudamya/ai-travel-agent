import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function getPlaceImage(query) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 1,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
      timeout: 10000,
    })

    const photo = res.data?.results?.[0]

    if (!photo) {
      return null
    }

    return photo.urls?.regular || null
  } catch (err) {
    console.log("Unsplash place image failed:", err.response?.data || err.message)
    return null
  }
}