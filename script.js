let currentPokemon; 


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded pokemon', currentPokemon)
    renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = capFirst(currentPokemon['name']);
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}