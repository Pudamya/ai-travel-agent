import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generatePlan(data){

try{

const prompt = `
Create a travel itinerary.

Weather:
${JSON.stringify(data.weather)}

Places:
${JSON.stringify(data.places)}

Hotels:
${JSON.stringify(data.hotels)}

Flights:
${JSON.stringify(data.flights)}
`

const completion = await openai.chat.completions.create({
model:"gpt-4.1-mini",
messages:[
{role:"system",content:"You are an expert travel planner"},
{role:"user",content:prompt}
]
})

return completion.choices[0].message.content

}catch(err){

console.log("OpenAI planner failed")

return "Sample itinerary: Visit main attractions, explore the city, and enjoy local food."

}

}