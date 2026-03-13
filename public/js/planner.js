document
.getElementById("tripForm")
.addEventListener("submit", async (e)=>{

e.preventDefault()

const data = {
from:document.getElementById("from").value,
to:document.getElementById("to").value,
count:document.getElementById("count").value,
budget:document.getElementById("budget").value,
style:document.getElementById("style").value
}

const res = await fetch("/plan-trip",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

const result = await res.json()

localStorage.setItem("trip",JSON.stringify(result))

window.location.href="results.html"

})