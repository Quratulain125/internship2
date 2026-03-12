const apiKey="6b776c94323247d624c00bf39be0c360"

async function getWeather(){

const city=document.getElementById("cityInput").value

const url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

const response=await fetch(url)
const data=await response.json()

document.getElementById("city").innerText=data.name
document.getElementById("temp").innerText=Math.round(data.main.temp)+"°C"
document.getElementById("humidity").innerText=data.main.humidity+"%"
document.getElementById("wind").innerText=data.wind.speed+" km/h"
document.getElementById("pressure").innerText=data.main.pressure

let icon=data.weather[0].icon

document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${icon}@4x.png`

let weather=data.weather[0].main

changeBackground(weather)

getForecast(city)

}

async function getForecast(city){

const url=
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

const response=await fetch(url)
const data=await response.json()

const forecastDiv=document.getElementById("forecast")

forecastDiv.innerHTML=""

for(let i=0;i<7;i++){

let item=data.list[i*5]

let date=new Date(item.dt_txt)

let day=date.toLocaleDateString("en-US",{weekday:"short"})

let temp=Math.round(item.main.temp)

let icon=item.weather[0].icon

forecastDiv.innerHTML+=`

<div class="card">

<p>${day}</p>

<img src="https://openweathermap.org/img/wn/${icon}.png">

<p>${temp}°C</p>

</div>

`

}

}

function changeBackground(weather){

const body=document.getElementById("body")

if(weather==="Clear"){

body.style.background="linear-gradient(135deg,#f7971e,#ffd200)"

}

else if(weather==="Clouds"){

body.style.background="linear-gradient(135deg,#757f9a,#d7dde8)"

}

else if(weather==="Rain"){

body.style.background="linear-gradient(135deg,#314755,#26a0da)"

}

else{

body.style.background="linear-gradient(135deg,#1e3c72,#2a5298)"

}

}