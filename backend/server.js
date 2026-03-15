import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { runTravelPlanner } from "./agents/coordinatorAgent.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
res.send("AI Travel Agent Backend Running")
})

app.post("/travel", async (req,res)=>{

try{

console.log("Incoming request:",req.body)

const result = await runTravelPlanner(req.body)

res.json(result)

}catch(err){

console.error(err)

res.status(500).json({
error:"Travel planner failed"
})

}

})

app.listen(3000,()=>{
console.log("Backend running on port 3000")
})