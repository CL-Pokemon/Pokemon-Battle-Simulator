window.addEventListener('DOMContentLoaded', () => {

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

    fetchPokeAPI(`https://pokeapi.co/api/v2/pokemon?limit=100`);

    async function fetchPokeAPI(url){
        try{
            let index = 0;
            const response = await fetch(url);
            const data = await response.json();
            data.results.forEach(async(ele) => {

                //console.log(ele)
                const url2 = `https://pokeapi.co/api/v2/pokemon/${ele.name}/`;
                const response2 = await fetch(url2);
                const data2 = await response2.json();
                //console.log(data2);

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
                numPoke.innerText = `No. ${index+=1}`;

                let name = document.createElement('p');
                name.id = 'pokeName';
                name.className = 'd-inline';
                list.append(name);
                name.innerText = ` ${ele.name[0].toUpperCase() + ele.name.slice(1)}`;

                list.addEventListener("mouseenter" , function(){
                    console.log(data2);
                    console.log(ele)  //placeholder for later
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
            })
        }
        catch(error){
            console.log(error);

        }
    }
});


