import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY
)

export async function searchKnowledge(query){

 const { data } = await supabase
   .from("travel_knowledge")
   .select("*")
   .textSearch("content", query)

 return data
}