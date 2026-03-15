import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function generateTravelImage(place){

try{

const img = await openai.images.generate({
model:"gpt-image-1",
prompt:`travel photography of ${place}`
})

return img.data[0].url

}catch(err){

console.log("Image generation failed")

return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"

}

}