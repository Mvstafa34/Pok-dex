let currentPokemon;
let id;
let name;
let types;
let image;
let color;
let height;
let weight;
let abilities;


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
    let pokedex = document.getElementById('pokedex');

    for (let i = 1; i < 99; i++) {

        await loadPokemon(i);
        const element = currentPokemon;

        id = getID(i);
        name = currentPokemon['name'];
        types = getTypes();
        image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        color = getColor(types);
        pokedex.innerHTML += returnPokedexHTML(id, name, types, image, color, i);
    }
}



async function openPokemon(i) {
    await loadPokemon(i);

    id = getID(i);
    name = currentPokemon['name'];
    types = getTypes();
    image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    color = getColor(types);

    height = getHeight();
    weight = getWeight();
    abilities = getAbilities();
    baseExp = currentPokemon['base_experience'];


    changeMainCard(id, name, types, image, color);
    changeAboutCard(height, weight, abilities, baseExp);

    document.body.classList.add('overflow-h');
    document.getElementById('cardContainer').classList.remove('d-none');
}


function closePokemon() {
    document.getElementById('cardContainer').classList.add('d-none');
    document.body.classList.remove('overflow-h');
}


function changeMainCard(id, name, types, image, color) {
    document.getElementById('cardName').innerHTML = name;
    document.getElementById('cardID').innerHTML = id;

    document.getElementById('cardTypes').innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        document.getElementById('cardTypes').innerHTML += `<span>${type}</span>`;
    }

    document.getElementById('cardImage').src = image;
    document.getElementById('openCard').style = `background-color: ${color};`;
}


function changeAboutCard(height, weight, abilities, baseExp) {
    document.getElementById('aboutHeight').innerHTML = height;
    document.getElementById('aboutWeight').innerHTML = weight;
    document.getElementById('aboutAbilities').innerHTML = abilities;
    document.getElementById('aboutBaseExp').innerHTML = baseExp;
}


function getHeight() {
    let height = currentPokemon['height'];
    let meters = height / 10;
    let feet = meters * 3.2808;
    let feetSplit = feet.toString().split('.');
    meters = meters.toString();
    
    if (meters.indexOf('.') > -1) {
        meters += '0';
    }

    return `${feetSplit[0]}'${feetSplit[1].substring(0, 2)}" (${meters} m)`;
}


function getWeight() {
    let weight = currentPokemon['weight'];
    let kilograms = weight / 10;
    let pounds = kilograms * 2.2046;
    pounds = pounds.toString();

    if (pounds.indexOf('.') > -1) {
        pounds = pounds.substring(0, pounds.indexOf('.') + 2);
    }

    return `${pounds} lbs (${kilograms} kg)`;
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


function getAbilities() {
    let abilities = currentPokemon['abilities']
    let abilitiesString;

    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i]['ability']['name'];

        if (i == 0) {
            abilitiesString = ability;
        } else {
            abilitiesString += ', ' + ability;
        }
    };

    return abilitiesString;
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
 * Returns the color for the first given pokemon type
 * @param {array} types - Array with all types of the pokemon
 * @returns - Color Variable
 */
function getColor(types) {
    let type = types[0];

    switch (type) {
        case 'grass':
            return 'var(--green)';
            break;
        case 'bug':
            return 'var(--lightGreen)';
            break;
        case 'fire':
            return 'var(--red)';
            break;
        case 'water':
            return 'var(--blue)';
            break;
        case 'fighting':
        case 'normal':    
            return 'var(--grey)';
            break;
        case 'electric':
        case 'psychic':
            return 'var(--yellow)';
            break;
        case 'poison':
        case 'ghost':
            return 'var(--purple)';
            break;
        case 'ground':
        case 'rock':
            return 'var(--brown)';
            break;
        case 'fairy':
            return 'var(--indigo)';
            break;
        case 'dark':
            return 'var(--black)';
            break;
        default:
            return 'var(--grey)';
    }
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
function returnPokedexHTML(id, name, types, image, color, i) {
    if (types.length == 1) {
        return /* html */ `
        <div class="pokemon" onclick="openPokemon(${i})" style="background-color: ${color};">
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
        <div class="pokemon" onclick="openPokemon(${i})" style="background-color: ${color};">
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
        <div class="pokemon" onclick="openPokemon(${i})" style="background-color: ${color};">
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

//TODO: openPokemon(i) function



//TODO: all names capFirst()