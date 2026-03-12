import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// SERVE FRONTEND FILES
app.use(express.static("public"))

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post("/chat", async (req,res)=>{

  const { message } = req.body

  try {

    const stream = await openai.chat.completions.create({
      model:"gpt-4.1-mini",
      messages:[
        {role:"system",content:"You are an AI travel assistant"},
        {role:"user",content:message}
      ],
      stream:true
    })

    res.setHeader("Content-Type","text/plain")

    for await (const chunk of stream){

      const text = chunk.choices[0]?.delta?.content || ""
      res.write(text)

    }

    res.end()

  } catch(err){

    console.error(err)
    res.status(500).send("Error generating response")

  }

})

app.listen(3000,()=>{
  console.log("Server running at http://localhost:3000")
})