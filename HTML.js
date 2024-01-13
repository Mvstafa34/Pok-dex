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


/**
 * Returns the HTML for the about-section on the open card
 * 
 * @returns - HTML
 */
function returnAboutHTML() {
    return /* html */ `
    <table class="about">
        <tr>
            <td>Height</td>
            <td id="aboutHeight">2'3,6(0.70cm)</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td id="aboutWeight">15.2 lbs (6.9 kg)</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="aboutAbilities">Overgrow, Chlorophyl</td>
        </tr>
        <tr>
            <td>Base Exp.</td>
            <td id="aboutBaseExp">64</td>
        </tr>
    </table>`
}


/**
 * Returns the HTML for the base stats-section on the open card
 * 
 * @returns - HTML
 */
function returnBaseStatsHTML() {
    return /* html */ `
    <table>
        <tr>
            <td>HP</td>
            <td id="hp">45</td>
            <td>
                <div class="progress-bar"><progress id="hpProgress" max="255" value="45"></progress></div>
            </td>
        </tr>
        <tr>
            <td>Attack</td>
            <td id="atk">60</td>
            <td>
                <div class="progress-bar"><progress id="atkProgress" max="255" value="60"></progress></div>
            </td>

        </tr>
        <tr>
            <td>Defense</td>
            <td id="def">48</td>
            <td>
                <div class="progress-bar"><progress id="defProgress" max="255" value="48"></progress></div>
            </td>
        </tr>
        <tr>
            <td>Sp. Atk</td>
            <td id="spAtk">65</td>
            <td>
                <div class="progress-bar"><progress id="spAtkProgress" max="255" value="65"></progress></div>
            </td>
        </tr>
        <tr>
            <td>Sp. Def</td>
            <td id="spDef">65</td>
            <td>
                <div class="progress-bar"><progress id="spDefProgress" max="255" value="65"></progress></div>
            </td>
        </tr>
        <tr>
            <td>Speed</td>
            <td id="spd">45</td>
            <td>
                <div class="progress-bar"><progress id="spdProgress" max="255" value="45"></progress></div>
            </td>
        </tr>
    </table>`
}