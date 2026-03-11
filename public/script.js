async function plan(){

const city = document.getElementById("city").value

const res = await fetch("http://localhost:3000/travel",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({destination:city})

})

const data = await res.json()

document.getElementById("result").innerHTML=`

<h3>Weather</h3>
<p>${data.weather.temp}°C ${data.weather.condition}</p>

<h3>Travel Plan</h3>
<pre>${data.plan}</pre>

<img src="${data.image}" width="400">

`

}