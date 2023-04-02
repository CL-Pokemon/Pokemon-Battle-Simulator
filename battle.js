import Pokemon from "./pokemon.js";

let player1 = JSON.parse(window.localStorage.getItem("player1")),
player1_Party = {},

player1_currentPokemon = null,
initial = document.querySelector("#bottomPanel-initial"),
movesArray = document.querySelector("#bottomPanel-moves"),
deleteButton = document.querySelector("#delete"),
player1_currentMove = null, 
textBox = document.querySelector("#textBox"),
player1_currentPokemon_maxHealth = Object.values(player1)[0].maxHP,
player1_currentPokemon_percentHealth = player1_currentPokemon_maxHealth, 
boss_maxHealth = 1500 , 
boss_percentHealth = 1500, 
player1_pokemonNames = Object.getOwnPropertyNames(player1),
player1_pokemonName = `${player1_pokemonNames[0][0].toUpperCase()}${player1_pokemonNames[0].slice(1)}`, 
weatherIcon = document.querySelector("#weatherIcon")


const playerSprite = document.querySelector("#pokemonSprite"),
bossSprite = document.querySelector("#BossSprite"),
pokeHealthBar = document.querySelector("#playerHealthBar"),
bossHealthBar = document.querySelector("#BossHealthBar")


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
    textBox.innerHTML = ""
    
    //console.log(player1_currentMove)
    
    let battlePoints = player1_currentMove.power
    if(boss_percentHealth - battlePoints >= 0){
        textBox.innerHTML += `${player1_pokemonName} used ${player1_currentMove.name}!<br>` 
        boss_percentHealth -= battlePoints*3;
        const tl = gsap.timeline()
        tl.to(playerSprite, {
            x:-5
        })
            .to(playerSprite,{
                x:35,
                duration:0.1,
                onComplete(){
                    gsap.to(playerSprite,{
                        x:45,
                        yoyo:true,
                        repeat:5,
                        duration:0.08
                    })

                    gsap.to(bossSprite,{
                        opacity:0,
                        repeat:5,
                        yoyo:true,
                        duration:0.08,
                    })
                }
            })
            .to(playerSprite,{
                x:15
            })
        // gsap.to(playerSprite,{
        //     opacity:0,
        //     repeat:5,
        //     yoyo:true,
        //     duration:0.08,
        //     fill:'blue'
        // });
        
    }else{
        boss_percentHealth = 0
        textBox.innerHTML = `${player1_pokemonName} has won!`
    }

    let bossPercent = (boss_percentHealth / boss_maxHealth) * 100
    bossHealthBar.style.width = `${bossPercent}%`

    

    
}

function battle(){

    textBox.innerText = `What will ${player1_pokemonName} do?`
    player1_currentPokemon = player1_Party[player1_pokemonNames[0]]
    playerSprite.src = player1_currentPokemon.backSprite
    player1_currentPokemon.setMoves()
     
    console.log(player1_currentPokemon)

    const runAway = document.createElement("div")
    const attack = document.createElement("div")

    runAway.setAttribute("id" , "b12")
    attack.setAttribute("id" , "b12")
    runAway.innerText = "Run Away"
    attack.innerText = "Attack"
    initial.append(attack , runAway)

    let playerColors = player1_currentPokemon.colors

    player1_currentPokemon.moves.forEach(element => {
        let moveType = Object.values(element)[0].type
        let moveColor = playerColors[moveType]

        const pokeAttack = document.createElement("div");
        pokeAttack.setAttribute("id" , "pAttack");

        pokeAttack.style.backgroundColor = `rgb(${moveColor[0]} , ${moveColor[1]} , ${moveColor[2]})`
        pokeAttack.innerText = `${Object.keys(element)[0][0].toUpperCase()}${Object.keys(element)[0].slice(1)}` 

        pokeAttack.style.borderWidth = "20px";
        movesArray.append(pokeAttack)

        
        pokeAttack.addEventListener("mouseenter" , function(){
            player1_currentMove = Object.values(element)[0]
        })

        pokeAttack.addEventListener("click" , battleDamage)    

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
            weatherIcon.src = data.current.condition.icon
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
