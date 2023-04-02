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
weatherIcon = document.querySelector("#weatherIcon"), 
weatherTemp = null, 
battleEnd = false


const playerSprite = document.querySelector("#pokemonSprite"),
bossSprite = document.querySelector("#BossSprite"),
pokeHealthBar = document.querySelector("#playerHealthBar"),
bossHealthBar = document.querySelector("#BossHealthBar"), 
bossMoves = [{name : "psychic" , power : 90 , type : "psychic"} , {name : "future sight" , power : 120 , type : "psychic"} , {name : "ancient power" , power : 60 , type : "rock"} , {name : "aura sphere" , power : 80 , type : "fighting"}]


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
    let pButtons = document.querySelectorAll("#pAttack")
    for(let i = 0; i < pButtons.length ; i++){    
        pButtons[i].disabled = true
    }
    setTimeout(() =>{
        let index = Math.floor(Math.random() * 4),
        bossAttack = bossMoves[index],
        bossBattlePoints = bossAttack.power
        if(player1_currentPokemon_maxHealth - bossBattlePoints >= 0 && battleEnd == false){
            textBox.innerHTML = `Mewtwo used ${bossAttack.name}!<br>` 
            const tl2 = gsap.timeline()
            tl2.to(bossSprite, {
                x:-20
            })
                .to(bossSprite,{
                    x:20,
                    duration:0.1,
                    onComplete(){
                        gsap.to(bossSprite,{
                            x:30,
                            yoyo:true,
                            repeat:5,
                            duration:0.08
                        })

                        gsap.to(playerSprite,{
                            opacity:0,
                            repeat:5,
                            yoyo:true,
                            duration:0.08,
                        })
                    }
                })
                .to(bossSprite,{
                    x:0
                })
            player1_currentPokemon_percentHealth -= bossBattlePoints * 3
            
        }else{
            player1_currentPokemon_percentHealth = 0
            textBox.innerHTML = "Mewtwo has won!"
            for(let i = 0; i < pButtons.length ; i++){
                pButtons[i].disabled = true
            }
            battleEnd = true
        }
        let pokePercent = (player1_currentPokemon_percentHealth / player1_currentPokemon_maxHealth) * 100 
        pokeHealthBar.style.width = `${pokePercent}%`

    } , "3000")
    setTimeout(() =>{
        if(!battleEnd){
            for(let i = 0; i < pButtons.length ; i++){
                pButtons[i].disabled = false
            }
        }
    } , "6000")
    
    let battlePoints = player1_currentMove.power
    if(boss_percentHealth - battlePoints >= 0){
        textBox.innerHTML += `${player1_pokemonName} used ${player1_currentMove.name}!<br>` 
        if(weatherTemp >= 75){
            if(player1_currentMove.type == "fire"){
                boss_percentHealth -= battlePoints*3.5
            }else if(player1_currentMove.type == "ice"){
                boss_percentHealth -= battlePoints*2.5
            }
        }else if(weatherTemp <= 32){
            if(player1_currentMove.type == "fire"){
                boss_percentHealth -= battlePoints*2.5
            }else if(player1_currentMove.type == "ice"){
                boss_percentHealth -= battlePoints*3.5
            }
        }else{
            boss_percentHealth -= battlePoints*3
        }
        const tl = gsap.timeline()
        tl.to(playerSprite, {
            x:-20
        })
            .to(playerSprite,{
                x:20,
                duration:0.1,
                onComplete(){
                    gsap.to(playerSprite,{
                        x:30,
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
                x:0
            })
            
    }else{
        boss_percentHealth = 0
        textBox.innerHTML = `${player1_pokemonName} has won!`
        for(let i = 0; i < pButtons.length ; i++){
            pButtons[i].disabled = true
        }
        battleEnd = true
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
        
        const pokeAttack = document.createElement("button");
        pokeAttack.setAttribute("id" , "pAttack");
        
        pokeAttack.style.borderColor = `rgb(${moveColor[0]} , ${moveColor[1]} , ${moveColor[2]})`
        pokeAttack.style.color = `rgb(${moveColor[0]} , ${moveColor[1]} , ${moveColor[2]})`
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
            weatherTemp = data.current.temp_f
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
