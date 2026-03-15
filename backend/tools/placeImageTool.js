import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function getPlaceImage(query, page = 1) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 10,
        page,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
      timeout: 10000,
    })

    const results = res.data?.results || []

    if (!results.length) return null

    const selected = results[Math.min(page - 1, results.length - 1)]

    return selected?.urls?.regular || null
  } catch (err) {
    console.log("Unsplash place image failed:", err.response?.data || err.message)
    return null
  }
}