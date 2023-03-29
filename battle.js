window.addEventListener('DOMContentLoaded', ()=>{

    // const token = config.MY_API_TOKEN;

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(position =>{
    //         console.log('My General Position:', position);
    //         const long = position.coords.longitude;
    //         const lat = position.coords.latitude;
    //         console.log(lat, long);

    //         fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${token}&q=${lat},${long}`);
    //     })
    // }
    // async function fetchWeather (url){
    //     try{
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         console.log(data);
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    let player1 = JSON.parse(window.localStorage.getItem("player1"))
    let charmander = JSON.parse(window.localStorage.getItem("charmander"))
    console.log(player1)
    //console.log(Object.keys(pokemonDeck).length) 
    console.log(charmander)
});