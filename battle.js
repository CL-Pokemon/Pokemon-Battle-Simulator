window.addEventListener('DOMContentLoaded', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log('My General Position:', position);
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            console.log(lat, long);
        })
    }
});