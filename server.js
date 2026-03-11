import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import OpenAI from "openai"

import { getWeather } from "./tools/weatherTool.js"
import { generateImage } from "./tools/imageTool.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
})

app.post("/travel", async (req,res)=>{

 const { destination } = req.body

 try{

 const weather = await getWeather(destination)

 const completion = await openai.chat.completions.create({
   model:"gpt-4.1-mini",
   messages:[
   {
    role:"system",
    content:"You are an expert travel planner."
   },
   {
    role:"user",
    content:`Plan a 3 day trip to ${destination}.
    Weather is ${weather.temp}°C and ${weather.condition}`
   }
   ]
 })

 const image = await generateImage(destination)

 res.json({
   plan: completion.choices[0].message.content,
   weather: weather,
   image: image
 })

 }catch(err){

 res.status(500).send("Error")

 }

})

app.listen(3000,()=>{
 console.log("Server running")
})