import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"

dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function generatePlan(data) {
  try {
    const prompt = `
Create a ${data.days || 2}-day travel itinerary.

From: ${data.from || "Unknown"}
To: ${data.to || "Unknown"}

Weather:
${JSON.stringify(data.weather, null, 2)}

Places:
${JSON.stringify(data.places, null, 2)}

Hotels:
${JSON.stringify(data.hotels, null, 2)}

Flights:
${JSON.stringify(data.flights, null, 2)}

Return a clean day-by-day itinerary.
`

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    })

    return response.text || "Day 1: Arrive and explore.\nDay 2: Visit major attractions."
  } catch (err) {
    console.log("Gemini planner failed:", err.message)
    return "Day 1: Arrive and explore the city.\nDay 2: Visit major attractions and enjoy local food."
  }
}