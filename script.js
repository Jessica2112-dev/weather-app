const apikey="df69df875dbfe4a72f5cdd151309d210";
async function getWeather(){
    const city=document.getElementById("cityInput").value;
    const resultDiv=document.getElementById("result");
    if(city==""){
        resultDiv.innerHTML="Please enter a city name";
        return;
    }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    try{
        const response=await fetch(url);
        if(!response.ok){
            resultDiv.innerHTML="City not found.";
            return;
        }
        const data=await response.json();
        const icon=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${icon}@2x.png`;
        const description=data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1);
        resultDiv.innerHTML=`<h3>${data.name}</h3> 
                              <img src="${iconUrl}" alt="weather icon">
                              <p><b>${description}</b></p>
                              <p>&#127777 Temperature: ${data.main.temp} C</p>
                              <p>&#128167 Humidity: ${data.main.humidity}%</p>
                              `;
    }
    catch(error){
        resultDiv.innerHTML=`Oops! Something went wrong.`;
        console.error(error);
    }
}
document.getElementById("getWeatherBtn").addEventListener("click",getWeather);
document.getElementById("cityInput").addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        getWeather();
    }
});

