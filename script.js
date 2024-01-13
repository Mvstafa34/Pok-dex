let currentPokemon;
let currentEvolutionChain;


/**
 * Initializes the pokedex
 */
function initPokedex() {
    renderPokedex();
}


/**
 * Renders the Pokemon-Info card to the "currentPokemon"
 */
function renderPokemonInfo() {
    document.getElementById('cardName').innerHTML = capFirst(currentPokemon['name']);
    document.getElementById('cardImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


/**
 * Renders the pokedex with the individual pokemons
 */
async function renderPokedex() {
    let pokedex = document.getElementById('pokedex');

    for (let i = 1; i < 151; i++) {

        await loadPokemon(i);
        const element = currentPokemon;

        let id = getID(i);
        let name = currentPokemon['name'];
        let types = getTypes();
        let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        let color = getColor();

        pokedex.innerHTML += returnPokedexHTML(id, name, types, image, color, i);
    }
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
 * Opens the card to the given pokemon
 * 
 * @param {number} i - Index of the pokemon
 */
async function openPokemon(i) {
    await loadPokemon(i);

    let id = getID(i);
    let name = currentPokemon['name'];
    let types = getTypes();
    let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let color = getColor();

    changeMainCard(id, name, types, image, color);
    renderAbout();

    document.body.classList.add('overflow-h');
    document.getElementById('cardContainer').classList.remove('d-none');
}


/**
 * Closes the card
 */
function closePokemon() {
    document.getElementById('cardContainer').classList.add('d-none');
    document.body.classList.remove('overflow-h');
}


/**
 * Changes the default main card information to the information of the pokemon
 * 
 * @param {string} id - ID of the pokemon in pokedex-style
 * @param {string} name - Name of the pokemon
 * @param {array} types - All types of the pokemon
 * @param {string} image - Image-URL of the pokemon
 * @param {string} color - Background color of the pokemon
 */
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


/**
 * Renders the default about-section of the card
 */
function renderAbout() {
    document.getElementById('cardInfo').innerHTML = returnAboutHTML()

    let height = getHeight();
    let weight = getWeight();
    let abilities = getAbilities();
    let baseExp = currentPokemon['base_experience'];

    changeAboutCard(height, weight, abilities, baseExp);
}


/**
 * Changes the card information in the about section to the information of the pokemon
 * 
 * @param {string} height 
 * @param {string} weight 
 * @param {string} abilities 
 * @param {number} baseExp 
 */
function changeAboutCard(height, weight, abilities, baseExp) {
    document.getElementById('aboutHeight').innerHTML = height;
    document.getElementById('aboutWeight').innerHTML = weight;
    document.getElementById('aboutAbilities').innerHTML = abilities;
    document.getElementById('aboutBaseExp').innerHTML = baseExp;
}


/**
 * Renders the default base stats-section of the card
 */
function renderBaseStats() {
    document.getElementById('cardInfo').innerHTML = returnBaseStatsHTML();

    let hp = currentPokemon['stats'][0]['base_stat'];
    let atk = currentPokemon['stats'][1]['base_stat'];
    let def = currentPokemon['stats'][2]['base_stat'];
    let spAtk = currentPokemon['stats'][3]['base_stat'];
    let spDef = currentPokemon['stats'][4]['base_stat'];
    let spd = currentPokemon['stats'][5]['base_stat'];

    changeBaseStatsCard(hp, atk, def, spAtk, spDef, spd);
}


/**
 * Changes the card information in the base stats section to the information of the pokemon
 * 
 * @param {number} hp - HP value of the pokemon
 * @param {number} atk - Attack value of the pokemon
 * @param {number} def - Defense value of the pokemon
 * @param {number} spAtk - Special attack value of the pokemon
 * @param {number} spDef - Special defense value of the pokemon
 * @param {number} spd - Speed value of the pokemon
 */
function changeBaseStatsCard(hp, atk, def, spAtk, spDef, spd) {
    document.getElementById('hp').innerHTML = hp;
    document.getElementById('hpProgress').value = hp;

    document.getElementById('atk').innerHTML = atk;
    document.getElementById('atkProgress').value = atk;

    document.getElementById('def').innerHTML = def;
    document.getElementById('defProgress').value = def;

    document.getElementById('spAtk').innerHTML = spAtk;
    document.getElementById('spAtkProgress').value = spAtk;

    document.getElementById('spDef').innerHTML = spDef;
    document.getElementById('spDefProgress').value = spDef;

    document.getElementById('spd').innerHTML = spd;
    document.getElementById('spdProgress').value = spd;

    //TODO: Change progres bar color to pokemon color
}


function renderEvolution() {
    document.getElementById('cardInfo').innerHTML = returnEvolutionHTML();

    let noEvolution;
    let firstEvolution;
    let secondEvolution;
    let levelRequirement;
}


// /**
//  * Sets "currentEvolutionChain" to the JSON of the given pokemon ID
//  * 
//  * @param {number} i - ID of the pokemon
//  */
// async function loadEvolutionChain(i) {
//     let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     let response = await fetch(url);
//     currentPokemon = await response.json();

//     console.log('Loaded pokemon', currentPokemon)
// }


function renderMoves() {

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


/**
 * Returns the abilities of the "currentPokemon"
 * 
 * @returns - All abilities as a string
 */
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
 * 
 * @returns - Color Variable
 */
function getColor() {
    let type = currentPokemon['types'][0]['type']['name'];

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
 * Capitalizes the first letter of a word
 * 
 * @param {string} str - A word
 * @returns - The word with first letter capitalized
 */
function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//TODO: all names capFirst()