import { OpenAIEmbeddings } from "@langchain/openai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_KEY
)

const embeddings = new OpenAIEmbeddings()

export async function searchTravelKnowledge(query){

const vector = await embeddings.embedQuery(query)

const { data } = await supabase.rpc("match_documents",{
query_embedding: vector,
match_count:3
})

return data.map(d => d.content).join("\n")

}