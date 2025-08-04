const API_KEY= "37b5fe4e2679a197f31a862cdcb037cb"
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// fetching html elements
const cityInput= document.getElementById("cityInput")
const searchbtn= document.getElementById("searchBtn")
const weatherDisplay= document.getElementById("weatherDisplay")
const loading = document.getElementById("loading"); 
const error= document.getElementById("error")
const errorMessage= document.getElementById("errorMessage")

// weather display elements
const CityName= document.getElementById("cityName")
const temperature= document.getElementById("temperature")
const weatherDescription= document.getElementById("weatherDescription")
const feelslike=document.getElementById("feelsLike")
const humidity= document.getElementById("humidity")
const windSpeed= document.getElementById("windSpeed")

searchbtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        handleSearch()
    }
    })
    // declaring
function handleSearch(){
    const city = cityInput.value.trim();

    if(!city){
        showError("Please enter a City Name")
        return
    }
    hideAllSections()
    showLoading()
    
    fetchWeatherData(city)
}
async function fetchWeatherData(city){
    try{
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response= await fetch(url)
        // this response will be awaited and all other functions  will be put on hold till then
        
        if (!response.ok) {
            if(response.status === 404){
                throw new Error("City not found, please check the spelling.");
            } else if(response.status === 401){
                throw new Error("Invalid API key.");
            } else {
                throw new Error("Failed to fetch weather data.");
            }
        }
        
        
        // parse this JSON data
        const data= await response.json()
        displayWeatherData(data)
    }

        catch (error) {
            console.error("Error fetching weather data:", error);
            hideLoading();
            showError(error.message);
        }
        
    }

// display weather function
function displayWeatherData(data){
    hideLoading()
    // Extract data from the API response
    
     const cityNameText = `${data.name}, ${data.sys.country}`; 
     const temp= Math.round(data.main.temp)
     const description= data.weather[0].description
     const feelsLikeTemp= Math.round(data.main.feels_like)
     const humidityValue= data.main.humidity
     const windSpeedValue= Math.round(data.wind.speed)
    cityName.textContent = cityNameText
    temperature.textContent= temp
    weatherDescription.textContent= description
    feelslike.textContent= feelsLikeTemp
    humidity.textContent= humidityValue
    windSpeed.textContent= windSpeedValue

    // show the weather display section
    showWeatherDisplay()
}
function showLoading(){
    loading.classList.remove("hidden")

}
function hideLoading(){
    loading.classList.add("hidden")
}
 
function showError(message){
    errorMessage.textContent= message
    error.classList.remove("hidden")

}
function hideError(){
    error.classList.add("hidden");

}

function showWeatherDisplay(){
    weatherDisplay.classList.remove("hidden")

}
function hideWeatherDisplay(){
    weatherDisplay.classList.add("hidden")
}

function hideAllSections(){
    hideLoading()
    hideError()
    hideWeatherDisplay()
}
// // function clearInput(){
// //     cityInput.value=""
// // }
// function handleSearch(){
//     const city = cityInput.value.trim();

//     if(!city){
//         showError("Please enter a City Name")
//         return
//     }
//     hideAllSections()
//     showLoading()
    
//     fetchWeatherData(city)     // ✅ data fetch hota hai
//     clearInput()               // ✅ yeh line yahin likhni hai
// }


function testWithSampleData(){
    const sampleData ={
        name:"London",
        sys: {country: "GB"},
        main:{
            temp:13.5,
            feels_like:13.2,
            humidity:78,

        },
    }    
        displayWeatherData(sampleData)

    
}