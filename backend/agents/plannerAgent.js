import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function generatePlan(data){

const prompt = `
Create a travel itinerary.

Weather:
${data.weather}

Places:
${data.places}

Hotels:
${data.hotels}

Flights:
${data.flights}
`

const completion = await openai.chat.completions.create({
model:"gpt-4.1-mini",
messages:[
{role:"system",content:"You are an expert travel planner"},
{role:"user",content:prompt}
]
})

return completion.choices[0].message.content
}