import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"

dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function generatePlan(data) {
  try {
    const prompt = `
You are an expert travel planner.

Create a clean ${data.days || 2}-day travel itinerary.

From:
${data.from || "Unknown"}

To:
${data.to || "Unknown"}

Travel dates:
${data.startDate || "Unknown"} to ${data.endDate || "Unknown"}

Weather summary:
${JSON.stringify(data.weather, null, 2)}

Places:
${JSON.stringify(data.places, null, 2)}

Hotels:
${JSON.stringify(data.hotels, null, 2)}

Flights:
${JSON.stringify(data.flights, null, 2)}

Requirements:
- Give a day-by-day itinerary
- Consider the weather of the selected travel dates
- Keep it realistic and tourist-friendly
- Mention food, sightseeing, and relaxation
- Do not include unnecessary separators like -- or ---
- Do not output JSON
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