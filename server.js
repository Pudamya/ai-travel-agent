import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { runTravelAgent } from "./agent/travelAgent.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/travel", async(req,res)=>{

const { query } = req.body

const result = await runTravelAgent(query)

res.json({response:result})

})

app.listen(3000,()=>{
console.log("Server running")
})