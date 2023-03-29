import Pokemon from "./pokemon.js";

let player1 = JSON.parse(window.localStorage.getItem("player1"))
let player1_Party = {}

async function addPossibleMove(pokeName , element){
    const moveResponse = await fetch(element.move.url);
    const moveData = await moveResponse.json();
    if((moveData.damage_class.name == "physical") && (moveData.power != null)){
        let move = {}
        move[moveData.name] = {}
        move[moveData.name]["name"] = moveData.name
        move[moveData.name]["power"] = moveData.power
        move[moveData.name]["type"] = moveData.type.name
        move[moveData.name]["pp"] = moveData.pp 
        move[moveData.name]["accuracy"] = moveData.accuracy
        player1_Party[pokeName].addPossibleMoves(move)     
    }
}

async function listPokemonParty(pokeName){
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
    const response = await fetch(pokemonUrl)
    const data2 = await response.json()
    player1_Party[pokeName] = new Pokemon(pokeName , data2.stats[0].base_stat , data2.stats[1].base_stat , data2.stats[2].base_stat , data2.stats[5].base_stat , {0 : null , 1 : null} , data2.sprites.back_default)
    data2.moves.forEach(element => addPossibleMove(pokeName , element))
}




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


    async function fetchPokemonData(){
        try{
            for(const pokemon in player1){
                listPokemonParty(pokemon)
            }
            console.log(player1)
            console.log(player1_Party)
        }
        catch{

        }
    }

    fetchPokemonData()    
});
