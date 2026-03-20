import axios from "axios"

export async function predictFlightPrice(data) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/predict", data, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    })

    const value = Number(res.data.predicted_price)

    return {
      value: Number.isFinite(value) ? Number(value.toFixed(2)) : 250,
      source: "ml-model",
    }
  } catch (err) {
    console.log("ML price prediction failed:", err.response?.data || err.message)
    return {
      value: Math.floor(Math.random() * 250) + 150,
      source: "fallback-random",
    }
  }
}