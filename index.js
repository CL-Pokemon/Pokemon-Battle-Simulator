import Pokemon from "./pokemon.js";

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

pokemonList = []

let currPoke = null,
    maxParty = 1


async function listPokemon(index){
    const url2 = `https://pokeapi.co/api/v2/pokemon/${index}/`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const pokeName = data2.forms[0].name

    let list = document.createElement('div');
    list.id = 'card';
    listCards.append(list);
    let img = document.createElement('img');
    img.id = 'poke-sprite';
    img.className = 'd-inline';
    list.append(img);
    img.src = data2.sprites.front_default;
    
    let numPoke = document.createElement('p');
    numPoke.id = 'idPoke';
    numPoke.className = 'd-inline';
    list.append(numPoke);
    numPoke.innerText = `No. ${index}`;

    let name = document.createElement('p');
    name.id = 'pokeName';
    name.className = 'd-inline';
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
        currPoke = data2.species.name
        console.log(data2)
        //console.log(currPoke)        
    })
}

window.addEventListener('DOMContentLoaded', () => {
    let limit  = 100;
    fetchPokeAPI();

    async function fetchPokeAPI(){
        try{
            for(let index = 1; index <= limit; index++){
                await listPokemon(index)
            }  
        }
        catch(error){
            console.log(error);     
        }
    }

});

addButton.addEventListener("click" , () => {
    player1.addPokemon(currPoke)
    console.log(player1.party)
})

deleteButton.addEventListener("click" , () => {
    player1.removePokemon(currPoke)
    console.log(player1.party)
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
            this.#party[name] = {"fainted" : false}
        }else{
            alert("Error: Can't add this pokemon to party.")
        }
    }

    removePokemon(name){
        if(this.#party.hasOwnProperty(name)){
            delete this.#party[name]
        }else{
            alert("This pokemon isn't in the party")
        }
    }

}

let player1 = new Player()
