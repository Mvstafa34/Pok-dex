let currentPokemon;


/**
 * Initializes the pokedex
 */
function initPokedex() {
    renderPokedex();
}


/**
 * Sets "currentPokemon" to the JSON of the given pokemon ID
 * 
 * @param {number} i - ID of the pokemon
 */
async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded pokemon', currentPokemon)
}


/**
 * Renders the Pokemon-Info card to the "currentPokemon"
 */
function renderPokemonInfo() {
    document.getElementById('cardName').innerHTML = capFirst(currentPokemon['name']);
    document.getElementById('cardImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


/**
 * Capitalizes the first letter of a word
 * 
 * @param {string} str - A word
 * @returns - The word with first letter capitalized
 */
function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * Renders the pokedex with the individual pokemons
 */
async function renderPokedex() {
    let id;
    let name;
    let types;
    let image;
    let pokedex = document.getElementById('pokedex');

    for (let i = 1; i < 30; i++) {

        await loadPokemon(i);
        const element = currentPokemon;

        id = getID(i);
        name = currentPokemon['name'];
        types = getTypes();
        image = currentPokemon['sprites']['other']['official-artwork']['front_default'];

        pokedex.innerHTML += returnPokedexHTML(id, name, types, image, i);
    }
}


/**
 * Returns the ID in the pokedex-style (#000)
 * 
 * @param {number} i - ID of the pokemon
 * @returns - ID in pokedex-style
 */
function getID(i) {
    if (i < 10) {
        return '#00' + i;
    } else if (i < 100) {
        return '#0' + i;
    } else if (i < 1000) {
        return '#' + i;
    }
}


/**
 * Returns all the types of the "currentPokemon"
 * 
 * @returns - Array with all types
 */
function getTypes() {
    let types = currentPokemon['types']
    let typesArray = [];

    for (let i = 0; i < types.length; i++) {
        const type = types[i]['type']['name'];
        typesArray.push(type);
    };

    return typesArray;
}


/**
 * Returns the HTML for every pokemon on the pokedex
 * 
 * @param {string} id - Pokedex-style ID of the pokemon
 * @param {string} name - Name of the pokemon
 * @param {array} types - All types of the pokemon
 * @param {string} image - Image of the pokemon
 * @param {number} i - ID of the pokemon
 * @returns - HTML
 */
function returnPokedexHTML(id, name, types, image, i) {
    if (types.length == 1) {
        return /* html */ `
        <div class="pokemon" onclick="openPokemon(${i})">
            <span id="pokemonID">${id}</span>
            <h2 id="pokemonName">${name}</h2>
            <div class="pokemonContainer">
                <div class="pokemon-info">
                    <span>${types[0]}</span>
                </div>
                <img src="${image}" alt="">
            </div>
        </div>`;
    } else if (types.length == 2) {
        return /* html */ `
        <div class="pokemon" onclick="openPokemon(${i})">
            <span id="pokemonID">${id}</span>
            <h2 id="pokemonName">${name}</h2>
            <div class="pokemonContainer">
                <div class="pokemon-info">
                    <span>${types[0]}</span>
                    <span>${types[1]}</span>
                </div>
                <img src="${image}" alt="">
            </div>
        </div>`;
    } else if (types.length == 3) {
        return /* html */ `
        <div class="pokemon" onclick="openPokemon(${i})">
            <span id="pokemonID">${id}</span>
            <h2 id="pokemonName">${name}</h2>
            <div class="pokemonContainer">
                <div class="pokemon-info">
                    <span>${types[0]}</span>
                    <span>${types[1]}</span>
                    <span>${types[2]}</span>
                </div>
                <img src="${image}" alt="">
            </div>
        </div>`;
    }
}