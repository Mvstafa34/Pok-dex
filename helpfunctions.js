/**
 * Returns the color for the first given pokemon type
 * 
 * @returns - Color Variable
 */
function getColor() {
    let type = currentPokemon['types'][0]['type']['name'];

    if (type == 'normal') {
        if (currentPokemon['types'][1]) {
            type = currentPokemon['types'][1]['type']['name'];
        };
    };

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
            return 'var(--pink)';
            break;
        case 'dark':
            return 'var(--black)';
            break;
        default:
            return 'var(--grey)';
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
        typesArray.push(capFirst(type));
    };

    return typesArray;
}


/**
 * Returns the height of the "currentPokemon"
 * 
 * @returns - Height in feet and meters as a string
 */
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


/**
 * Returns the weight of the "currentPokemon"
 * 
 * @returns - Weight in lbs and kg as a string
 */
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
 * Returns the abilities of the "currentPokemon"
 * 
 * @returns - All abilities as a string
 */
function getAbilities() {
    let abilities = currentPokemon['abilities']
    let abilitiesString;

    for (let i = 0; i < abilities.length; i++) {
        let ability = abilities[i]['ability']['name'];

        if (ability.includes('-')) {
            let abilitySplit = ability.split('-');
            
            ability = `${abilitySplit[0]} ${capFirst(abilitySplit[1])}`;
        };

        if (i == 0) {
            abilitiesString = capFirst(ability);
        } else {
            abilitiesString += ', ' + capFirst(ability);
        };
    };
    return abilitiesString;
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
 * Stops the inner element from executing the container onclick
 * @param {event} event 
 */
function stopPropagation(event) {
    event.stopPropagation();
}