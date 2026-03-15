import { useState } from "react"
import { DndContext } from "@dnd-kit/core"

export default function ItineraryTimeline({plan}){

const [items,setItems]=useState(plan.split("\n"))

function handleDragEnd(event){

const {active,over}=event

if(active.id!==over.id){

const oldIndex=items.indexOf(active.id)
const newIndex=items.indexOf(over.id)

const updated=[...items]

updated.splice(oldIndex,1)
updated.splice(newIndex,0,active.id)

setItems(updated)

}

}

return(

<div className="timeline">

<h3>Drag your itinerary</h3>

<DndContext onDragEnd={handleDragEnd}>

{items.map((item,i)=>(
<div key={i} className="card">{item}</div>
))}

</DndContext>

</div>

)

}