import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function searchHotels(city) {
  try {
    const key = process.env.GOOGLE_MAPS_KEY

    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: `hotels in ${city}`,
          key,
        },
        timeout: 10000,
      }
    )

    return (res.data.results || []).slice(0, 6).map((hotel) => ({
      name: hotel.name || "Hotel",
      rating: hotel.rating || 4.0,
      price: Math.floor(Math.random() * 180) + 80,
      address: hotel.formatted_address || "Address unavailable",
      lat: hotel.geometry?.location?.lat || null,
      lng: hotel.geometry?.location?.lng || null,
    }))
  } catch (err) {
    console.log("Hotel API failed:", err.response?.data || err.message)

    return [
      {
        name: "Grand Horizon Hotel",
        rating: 4.5,
        price: 140,
        address: "Central tourist district",
      },
      {
        name: "City Luxe Stay",
        rating: 4.3,
        price: 115,
        address: "Downtown area",
      },
      {
        name: "Sunset Residence",
        rating: 4.1,
        price: 95,
        address: "Near attractions",
      },
    ]
  }
}