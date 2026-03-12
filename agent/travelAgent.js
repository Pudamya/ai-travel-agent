import { ChatOpenAI } from "@langchain/openai"
import { DynamicTool } from "langchain/tools"
import { initializeAgentExecutorWithOptions } from "langchain/agents"

import { getWeather } from "../tools/weatherTool.js"
import { searchTravelKnowledge } from "../tools/vectorSearchTool.js"
import { generateTravelImage } from "../tools/imageTool.js"

const model = new ChatOpenAI({
temperature:0.7,
modelName:"gpt-4.1-mini"
})

const weatherTool = new DynamicTool({
name:"weather",
description:"Get current weather for a city",
func: async(city)=> await getWeather(city)
})

const knowledgeTool = new DynamicTool({
name:"travelKnowledge",
description:"Search travel knowledge database",
func: async(query)=> await searchTravelKnowledge(query)
})

const imageTool = new DynamicTool({
name:"travelImage",
description:"Generate travel image for a destination",
func: async(place)=> await generateTravelImage(place)
})

const tools = [weatherTool,knowledgeTool,imageTool]

export async function runTravelAgent(userInput){

const executor = await initializeAgentExecutorWithOptions(
tools,
model,
{
agentType:"zero-shot-react-description",
verbose:true
}
)

const result = await executor.run(userInput)

return result

}