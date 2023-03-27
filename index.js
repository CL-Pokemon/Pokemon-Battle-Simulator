const listCards = document.querySelector('#list-cards');
const pokeSprite = document.querySelector("#pokeSprite")
const logoSprite = document.querySelector('#logo-sprite');
const numberPoke = document.querySelector('#idPoke');
const namePoke = document.querySelector('#pokeName');

const type = document.querySelector('#resultType');
const height = document.querySelector('#resultHeight');
const weight = document.querySelector('#resultWeight');

const hp = document.querySelector('#resultHp');
const attack = document.querySelector('#resultAttack');
const defense = document.querySelector('#resultDefense');

const pokemonList = []
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

class Pokemon{
    #name
    #atk
    #def
    #hp
    #moves
    constructor(name , atk , def , hp){
        this.#name = name
        this.#atk = atk
        this.#def = def
        this.#hp = hp
        this.#moves = []
    }
    get name(){
        return this.#name
    }
    get atk(){
        return this.#atk
    }
    get def(){
        return this.#def
    }
    get hp(){
        return this.#hp
    }
    get moves(){
        return this.#moves
    }  

}



class Player{
    constructor(){
        this.party = []
    }

}