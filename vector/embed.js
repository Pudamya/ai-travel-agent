import { OpenAIEmbeddings } from "@langchain/openai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY
)

const embeddings = new OpenAIEmbeddings({
 openAIApiKey: process.env.OPENAI_API_KEY
})

async function storeKnowledge(){

 const texts = [
  "Tokyo cherry blossom season is March to April.",
  "Paris Eiffel Tower is busiest during summer.",
  "Sri Lanka beaches are best between December and April.",
  "Sigiriya rock fortress should be visited early morning."
 ]

 for(const text of texts){

 const vector = await embeddings.embedQuery(text)

 await supabase
   .from("travel_knowledge")
   .insert({
     content:text,
     embedding:vector
   })

 }

 console.log("Knowledge stored")

}

storeKnowledge()