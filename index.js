const listCards = document.querySelector('#list-cards'),
pokeSprite = document.querySelector("#pokeSprite"),
logoSprite = document.querySelector('#logo-sprite'),
numberPoke = document.querySelector('#idPoke'),
namePoke = document.querySelector('#pokeName'),

type = document.querySelector('#resultType'),
height = document.querySelector('#resultHeight'),
weight = document.querySelector('#resultWeight'),

hp = document.querySelector('#resultHp'),
attack = document.querySelector('#resultAttack'),
defense = document.querySelector('#resultDefense'),

addButton = document.querySelector("#addToParty"),
deleteButton = document.querySelector("#deleteFromParty"),
fightButton = document.querySelector('#fightingScene'),
playButton = document.querySelector('#playbtn'),
firstImgList = document.querySelector('#firstQueue')



let currPoke = null,
    maxParty = 1, 
    pokemonList = [],
    limit = 50

async function listPokemon(index){
    const url2 = `https://pokeapi.co/api/v2/pokemon/${index}/`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const pokeName = data2.forms[0].name


    let list = document.createElement('div');
    list.id = 'card';
    list.className = 'd-flex align-items-center m2'
    listCards.append(list);
    let img = document.createElement('img');
    img.id = 'poke-sprite';
    img.className = 'd-block';
    list.append(img);
    img.src = data2.sprites.front_default;
    
    let numPoke = document.createElement('p');
    numPoke.id = 'idPoke';
    numPoke.className = 'm-2';
    list.append(numPoke);
    numPoke.innerText = `No. ${index}`;

    let name = document.createElement('p');
    name.id = 'pokeName';
    name.className = 'm-2';
    list.append(name);
    name.innerText = ` ${pokeName[0].toUpperCase() + pokeName.slice(1)}`;

    list.addEventListener("mouseenter" , function(){
        pokeSprite.src = data2.sprites.front_default;
        logoSprite.src = data2.sprites.front_default;
        numberPoke.innerText = numPoke.innerText;
        namePoke.innerText = name.innerText;
        let listType = data2.types.map(ele => {
            return ele.type.name[0].toUpperCase() + ele.type.name.slice(1);
        });
        type.innerText = listType.join(' ');
        height.innerText = `${data2.height} Cm`;
        weight.innerText = `${data2.weight} Lbs`
        hp.innerText = data2.stats[0].base_stat;
        attack.innerText = data2.stats[1].base_stat;
        defense.innerText = data2.stats[2].base_stat;
        currPoke = data2//.species.name     
        //console.log(currPoke.species.name)  
    })
    pokemonList.push(pokeName)
    
}

window.addEventListener('DOMContentLoaded', () => {
    playButton.addEventListener('click', () => {
        document.querySelector("#body").style.overflowY = "scroll";
        document.querySelector('#startPage').style.display = "none";
    })
    

    let limit  = 50;
    fetchPokeAPI();

    async function fetchPokeAPI(){
        try{
            for(let index = 1; index <= limit; index++){
                await listPokemon(index)
            }  
            console.log(pokemonList)
        }
        catch(error){
            console.log(error);     
        }
    }

}); 

addButton.addEventListener("click" , () => {
    player1.addPokemon(currPoke);
    console.log(player1.party)
    window.localStorage.setItem("player1" , JSON.stringify(player1.party))
})

deleteButton.addEventListener("click" , () => {
    player1.removePokemon(currPoke)
    console.log(player1.party);
})
fightButton.addEventListener('click', ()=>{

    if(Object.keys(pokemonList).length == limit){
        player1.requirements();
    }else{
        alert("Please wait. Page hasnt finished loading")
    }
        
})






class Player{
    #party
    constructor(){
        this.#party = {}
    }

    get party(){
        return this.#party
    }

    addPokemon(name){
        if(Object.keys(this.#party).length < maxParty && currPoke != null){
            let fill = name.stats[0].base_stat * 15
            this.#party[name.species.name] = {"fainted" : false , maxHP : fill , atk : name.stats[1].base_stat , def : name.stats[2].base_stat}
            firstImgList.src = currPoke.sprites.front_default;
        }else{
            alert("Error: Can't add this pokemon to party.")
            // document.getElementById('addPoptext').classList.toggle('show');
        }
    }

    removePokemon(name){
        if(this.#party.hasOwnProperty(name.species.name)){
            delete this.#party[name.species.name]
            firstImgList.src = '';
        }else{
            alert("This pokemon isn't in the party")
            // document.getElementById('removePoptext').classList.toggle('show');
        }
    }
    requirements(){
        if(Object.keys(this.#party).length === maxParty){
            window.location.href = 'battle.html';
        }else{
            alert("No pokemon in the party")
            // document.getElementById('fightPoptext').classList.toggle('show');
        }  
    }
}

let player1 = new Player()