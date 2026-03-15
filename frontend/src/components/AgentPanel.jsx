import { motion } from "framer-motion"

export default function AgentPanel(){

const agents=[
"Coordinator Agent",
"Weather Agent",
"Flights Agent",
"Hotels Agent",
"Places Agent",
"Price Prediction Agent",
"Planner Agent"
]

return(

<div className="agentPanel">

<h3>AI Agents Working</h3>

{agents.map((a,i)=>(

<motion.div
key={i}
initial={{opacity:0,x:-50}}
animate={{opacity:1,x:0}}
transition={{delay:i*0.4}}
className="agentItem"
>

⚙ {a}

</motion.div>

))}

</div>

)

}