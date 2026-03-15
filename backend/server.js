import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { runTravelPlanner } from "./agents/coordinatorAgent.js"

dotenv.config()

const app = express()

/* -----------------------------
   CORS CONFIGURATION
------------------------------ */

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

app.use(cors(corsOptions))

// Handle preflight requests
app.options("*", cors(corsOptions))

/* -----------------------------
   MIDDLEWARE
------------------------------ */

app.use(express.json())

/* -----------------------------
   HEALTH CHECK ROUTE
------------------------------ */

app.get("/", (req, res) => {
  res.send("AI Travel Agent Backend Running")
})

/* -----------------------------
   MAIN TRAVEL PLANNER ROUTE
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