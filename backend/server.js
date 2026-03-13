import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { runTravelPlanner } from "./agents/coordinatorAgent.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/plan-trip", async (req, res) => {

try{

const data = req.body

const result = await runTravelPlanner(data)

res.json(result)

}catch(err){

console.error(err)

res.status(500).send("AI planner error")

}

})

app.listen(3000, () => {
console.log("Backend running on port 3000")
})