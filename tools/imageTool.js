import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function generateTravelImage(place){

const image = await openai.images.generate({
model:"gpt-image-1",
prompt:`travel photography of ${place}`
})

return image.data[0].url

}