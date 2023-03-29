import Pokemon from "./pokemon.js";

let player1 = JSON.parse(window.localStorage.getItem("player1"))
let player1_Party = {}

let player1_currentPokemon = null

const playerSprite = document.querySelector("#pokemonSprite")
const bossSprite = document.querySelector("#BossSprite")
const pokeHealthBar = document.querySelector("#playerHealthBar")

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
    let type = {0: null , 1 : null}
    type[0] = data2.types[0].type.name
    if(data2.types[1]){
        type[1] = data2.types[1].type.name
    }
    player1_Party[pokeName] = new Pokemon(pokeName , data2.stats[0].base_stat , data2.stats[1].base_stat , data2.stats[2].base_stat , data2.stats[5].base_stat , type , data2.sprites.back_default)
    data2.moves.forEach(element => addPossibleMove(pokeName , element))
    // player1_Party[pokeName].setMoves()
}

function battle(){
    let player1_pokemonNames = Object.getOwnPropertyNames(player1)
    player1_currentPokemon = player1_Party[player1_pokemonNames[0]]
    playerSprite.src = player1_currentPokemon.backSprite
    console.log(player1_currentPokemon)
}



window.addEventListener('DOMContentLoaded', ()=>{

    
    const token = config.MY_API_TOKEN;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //console.log('My General Position:', position);
            //console.log(lat, long);
            const long = position.coords.longitude;
            const lat = position.coords.latitude;

            fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${token}&q=${lat},${long}`);
        })
    }
    async function fetchWeather (url){
        try{
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        }
        catch(error){
            console.log(error)
        }
    }

    async function initial(){
        try{
            for(const pokemon in player1){
                listPokemonParty(pokemon)
            }
            

            setTimeout(battle , "500")

            console.log(player1)
            console.log(player1_Party)            

        }
        catch{

        }
    }
    initial()   
});
