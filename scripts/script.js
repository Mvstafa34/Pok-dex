let currentPokemon;
let allPokemonNames;
let searchTerm;
let loadedPokedex = 0;
let rendering = false;
let filtering = false;


/**
 * Initializes the pokedex
 */
async function initPokedex() {
    loadPokemonNames();
    await renderPokedex();
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
}


/**
 * Loads a JSON with all pokemon names in "allPokemonNames"
 */
async function loadPokemonNames() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0';
    let response = await fetch(url);
    allPokemonNames = await response.json();
}


/**
 * Renders the pokedex with 30 pokemons
 */
async function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';

    for (let i = 1; i < 31; i++) {

        await loadPokemon(i);

        let id = getID(i);
        let name = capFirst(currentPokemon['name']);
        let types = getTypes();
        let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        let color = getColor();

        if (filtering) {
            return;
        } else {
            pokedex.innerHTML += returnPokedexHTML(id, name, types, image, color, i);
        };
    };
    loadedPokedex = 31;
}


/**
 * Renders 30 more pokemons in the pokedex
 */
async function renderMorePokedex() {
    let pokedex = document.getElementById('pokedex');

    for (let i = loadedPokedex; i < loadedPokedex + 30; i++) {

        await loadPokemon(i);

        let id = getID(i);
        let name = capFirst(currentPokemon['name']);
        let types = getTypes();
        let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        let color = getColor();

        if (filtering) {
            return;
        } else {
            pokedex.innerHTML += returnPokedexHTML(id, name, types, image, color, i);
        };
    };
    loadedPokedex += 30;
}


/**
 * Prepares the search function
 * 
 * @returns - If not searching
 */
async function filterPokedex() {
    let search = document.getElementById('search').value.toLowerCase()
    let pokedex = document.getElementById('pokedex');
    filtering = true;

    pokedex.innerHTML = '';

    if (search == '') {
        filtering = false;
        renderPokedex();
        return;
    } else {
        searchTerm = search;
        await filterPokemon(search);
    };
}


/**
 * Checks if the pokemon name starts with the search string and displays it
 * 
 * @param {string} search - The input in the searchbar
 * @returns - If searchterm change or not searching
 */
async function filterPokemon(search) {
    for (let i = 1; i < 1302; i++) {
        
        let pokemonName = allPokemonNames['results'][i - 1]['name'];  

        if (pokemonName.includes(search)) {

            await loadPokemon(i);

            let name = capFirst(currentPokemon['name']);
            let id = getID(i);
            let types = getTypes();
            let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
            let color = getColor();

            if (!filtering ||searchTerm != search) {
                return;
            };

            pokedex.innerHTML += returnPokedexHTML(id, name, types, image, color, i);
        };
    };
}


/**
 * Opens the card to the given pokemon
 * 
 * @param {number} i - Index of the pokemon
 */
async function openPokemon(i, color) {

    await loadPokemon(i);

    let id = getID(i);
    let name = capFirst(currentPokemon['name']);
    let types = getTypes();
    let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    changeMainCard(id, name, types, image, color);
    renderAbout();

    document.getElementById('baseStats').setAttribute('onclick', `renderBaseStats('${color}')`);
    document.getElementById('moves').setAttribute('onclick', `renderMoves('${color}')`);
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
    };

    document.getElementById('cardImage').src = image;
    document.getElementById('openCard').style = `background-color: ${color};`;
}


/**
 * Renders the default about-section of the card and selects the tab
 */
function renderAbout() {
    document.getElementById('cardInfo').innerHTML = returnAboutHTML();
    let selectedTab = document.querySelector('.card-menu-selected');

    if (selectedTab) {
        selectedTab.classList.remove('card-menu-selected');
    };

    document.getElementById('about').classList.add('card-menu-selected');

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
 * Renders the default base stats-section of the card and selects the tab
 */
function renderBaseStats(color) {
    document.getElementById('cardInfo').innerHTML = returnBaseStatsHTML();
    let selectedTab = document.querySelector('.card-menu-selected');

    if (selectedTab) {
        selectedTab.classList.remove('card-menu-selected');
    };

    document.getElementById('baseStats').classList.add('card-menu-selected');

    let hp = currentPokemon['stats'][0]['base_stat'];
    let atk = currentPokemon['stats'][1]['base_stat'];
    let def = currentPokemon['stats'][2]['base_stat'];
    let spAtk = currentPokemon['stats'][3]['base_stat'];
    let spDef = currentPokemon['stats'][4]['base_stat'];
    let spd = currentPokemon['stats'][5]['base_stat'];

    changeBaseStatsCard(hp, atk, def, spAtk, spDef, spd);
    changeProgressColor(color);
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
}


/**
 * Renders the moves-section of the card with the moves of "currentPokemon" and selects the tab
 */
function renderMoves(color) {
    let moves = currentPokemon['moves']
    let cardInfo = document.getElementById('cardInfo');
    let selectedTab = document.querySelector('.card-menu-selected');

    if (selectedTab) {
        selectedTab.classList.remove('card-menu-selected');
    };

    document.getElementById('moves').classList.add('card-menu-selected');

    cardInfo.innerHTML = '';

    for (let i = 0; i < moves.length; i++) {
        const move = moves[i]['move']['name'];

        cardInfo.innerHTML += /* html */`<span class="moves" style="background-color: ${color};">${capFirst(move)}</span>`
    };
}


/**
 * Changes the color of the progress bar to the "currentPokemon" color
 */
function changeProgressColor(color) {
    document.querySelectorAll('progress').forEach((element) => {
        element.className = '';
        element.classList.add(`progress-${color.substring(6, color.length - 1)}`);
    });
}


/**
 * Checks if the user has scrolled to the bottom of the page
 */
function scrollCallbackFn() {
    
    if (rendering) {
        return;
    };

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        bottomReached();
    };
};


/**
 * Executes rendering more pokemon and prevents from multiple executes while rendering
 */
async function bottomReached() {
    rendering = true;
    await renderMorePokedex();
    rendering = false;
}


window.addEventListener('scroll', scrollCallbackFn);