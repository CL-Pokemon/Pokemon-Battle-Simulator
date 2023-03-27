// window.addEventListener('DOMContentLoaded', () => {

//     const listCards = document.querySelector('#list-cards');
//     const pokeSprite = document.querySelector("#pokeSprite")
//     // const sprite = document.querySelector('#poke-sprite');
//     // const numPoke = document.querySelector('#idPoke');
//     // const name = document.querySelector('#pokeName');

//     fetchPokeAPI(`https://pokeapi.co/api/v2/pokemon?limit=100`);

//     async function fetchPokeAPI(url){
//         try{
//             let index = 0;
//             const response = await fetch(url);
//             const data = await response.json();
//             data.results.forEach(async(ele) => {

//                 //console.log(ele)
//                 const url2 = `https://pokeapi.co/api/v2/pokemon/${ele.name}/`;
//                 const response2 = await fetch(url2);
//                 const data2 = await response2.json();
//                 //console.log(data2);

//                 let list = document.createElement('div');
//                 list.id = 'card';
//                 listCards.append(list);
//                 let img = document.createElement('img');
//                 img.id = 'poke-sprite';
//                 img.className = 'd-inline';
//                 list.append(img);
//                 img.src = data2.sprites.front_default;
                
//                 let numPoke = document.createElement('p');
//                 numPoke.id = 'idPoke';
//                 numPoke.className = 'd-inline';
//                 list.append(numPoke);
//                 numPoke.innerText = `No. ${index+=1}`;

//                 let name = document.createElement('p');
//                 name.id = 'pokeName';
//                 name.className = 'd-inline';
//                 list.append(name);
//                 name.innerText = ` ${ele.name[0].toUpperCase() + ele.name.slice(1)}`;

//                 list.addEventListener("mouseenter" , function(){
//                     console.log(ele.name)  //placeholder for later
//                     pokeSprite.src = data2.sprites.front_default
//                 })
//                 // console.log(data2);
//             });
//             // console.log(data.results);
//             // sprite.scr = 
//         }
//         catch(error){
//             console.log(error);

//         }
//     }
// });
window.addEventListener('DOMContentLoaded', () => {

    const listCards = document.querySelector('#list-cards');
    const pokeSprite = document.querySelector("#pokeSprite")
    // const sprite = document.querySelector('#poke-sprite');
    // const numPoke = document.querySelector('#idPoke');
    // const name = document.querySelector('#pokeName');

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
                    console.log(ele.name)  //placeholder for later
                    pokeSprite.src = data2.sprites.front_default
                })
                // console.log(data2);
            });
            // console.log(data.results);
            // sprite.scr = 
        }
        catch(error){
            console.log(error);

        }
    }
});


