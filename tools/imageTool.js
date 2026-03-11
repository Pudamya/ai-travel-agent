import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateImage(place){

 const img = await openai.images.generate({
   model: "gpt-image-1",
   prompt: `travel photography of ${place}`
 })

 return img.data[0].url
}