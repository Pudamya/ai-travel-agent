import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function generateTravelImage(place) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: `${place} skyline travel city landmark`,
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
      throw new Error("No Unsplash image found")
    }

    return {
      imageUrl: photo.urls?.regular,
      photographer: photo.user?.name || "Unknown photographer",
      photographerUrl: photo.user?.links?.html || "https://unsplash.com",
      unsplashUrl: photo.links?.html || "https://unsplash.com",
    }
  } catch (err) {
    console.log("Unsplash hero image failed:", err.response?.data || err.message)

    return {
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      photographer: "Unsplash",
      photographerUrl: "https://unsplash.com",
      unsplashUrl: "https://unsplash.com",
    }
  }
}