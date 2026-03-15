import { Link } from "react-router-dom"

export default function Home(){

return(

<div className="home">

<h1>AI Travel Planner ✈️</h1>

<p>
Plan complete trips using AI agents
</p>

<Link to="/planner">
<button className="startBtn">
Start Planning
</button>
</Link>

</div>

)

}