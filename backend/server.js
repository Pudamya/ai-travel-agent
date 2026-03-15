import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

import { runTravelPlanner } from "./agents/coordinatorAgent.js"

const app = express()

/* -----------------------------
   CORS CONFIG
------------------------------ */

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}

app.use(cors(corsOptions))

/* -----------------------------
   MIDDLEWARE
------------------------------ */

app.use(express.json())

/* -----------------------------
   HEALTH CHECK
------------------------------ */

app.get("/", (req, res) => {
  res.send("AI Travel Agent Backend Running")
})

/* -----------------------------
   MAIN TRAVEL ROUTE
------------------------------ */

app.post("/travel", async (req, res) => {
  try {

    console.log("Incoming request:", req.body)

    const result = await runTravelPlanner(req.body)

    res.json(result)

  } catch (err) {

    console.error("Planner error:", err)

    res.status(500).json({
      error: "Travel planner failed"
    })

  }
})

/* -----------------------------
   START SERVER
------------------------------ */

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})