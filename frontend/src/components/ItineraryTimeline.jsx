import { useState } from "react"

export default function ItineraryTimeline({plan}){

const [items,setItems] = useState(
plan.split("\n").filter(Boolean)
)

return(

<div className="timeline">

{items.map((item,i)=>(
<div key={i} className="card">
{item}
</div>
))}

</div>

)

}