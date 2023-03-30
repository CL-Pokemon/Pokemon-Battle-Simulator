import Pokemon from "./pokemon.js";

let player1 = JSON.parse(window.localStorage.getItem("player1")),
player1_Party = {},

player1_currentPokemon = null,
initial = document.querySelector("#bottomPanel-initial"),
movesArray = document.querySelector("#bottomPanel-moves"),
deleteButton = document.querySelector("#delete"),
player1_currentMove = null, 
textBox = document.querySelector("#textBox")



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
}

function battleDamage(){

}

function battle(){

    textBox.innerText = `What will ${Object.getOwnPropertyNames(player1)[0][0].toUpperCase()}${Object.getOwnPropertyNames(player1)[0].slice(1)} do?`
    let player1_pokemonNames = Object.getOwnPropertyNames(player1)
    player1_currentPokemon = player1_Party[player1_pokemonNames[0]]
    playerSprite.src = player1_currentPokemon.backSprite
    player1_currentPokemon.setMoves()
    //console.log(player1_currentPokemon)

    const runAway = document.createElement("div")
    const attack = document.createElement("div")

    runAway.setAttribute("id" , "b12")
    attack.setAttribute("id" , "b12")
    runAway.innerText = "Run Away"
    attack.innerText = "Attack"
    initial.append(attack , runAway)

    let playerColors = player1_currentPokemon.colors
    //console.log(playerColors["normal"])

    player1_currentPokemon.moves.forEach(element => {
        let moveType = Object.values(element)[0].type
        let moveColor = playerColors[moveType]
        // console.log(element)
        // console.log(Object.keys(element)[0])
        const pokeAttack = document.createElement("div")
        pokeAttack.setAttribute("id" , "pAttack")

        pokeAttack.style.color = `rgb(${moveColor[0]} , ${moveColor[1]} , ${moveColor[2]})`
        pokeAttack.style.borderColor = `rgb(${moveColor[0]} , ${moveColor[1]} , ${moveColor[2]})`
        pokeAttack.innerText = `${Object.keys(element)[0][0].toUpperCase()}${Object.keys(element)[0].slice(1)}` 
        //console.log(pokeAttack)
        pokeAttack.style.borderWidth = "20px"
        movesArray.append(pokeAttack)

        //
        //pokeAttack.addEventListener("mouseenter" , function(){
            //player1_currentMove = element
            //console.log(player1_currentMove)
        //})
        //pokeAttack.addEventListener("click" , battleDamage)
        //

    });


    deleteButton.addEventListener("click" , function(){
        initial.style.display = "flex"
        movesArray.style.display = "none"
    })

    attack.addEventListener("click" , function(){
        initial.style.display = "none"
        movesArray.style.display = "grid" // update later
    })

    runAway.addEventListener("click" , function(){
        window.location.href = 'index.html';
        localStorage.clear()
    })


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

            setTimeout(battle , "1500")

            console.log(player1)
            console.log(player1_Party)            

        }
        catch{

        }
    }
    initial()   
});
