import { ChatOpenAI } from "@langchain/openai"

const model = new ChatOpenAI({
modelName:"gpt-4.1-mini",
temperature:0.7
})

export async function generatePlan(data){

const prompt = `
Create a travel plan using this information:

Weather:
${data.weather}

Attractions:
${data.places}

Hotels:
${data.hotels}

Flights:
${data.flights}
`

const response = await model.invoke(prompt)

return response.content

}