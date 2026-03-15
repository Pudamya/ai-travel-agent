export default function ItineraryTimeline({plan}){

const items = plan.split("\n")

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