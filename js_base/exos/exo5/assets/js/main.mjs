import Pokemon from "./Pokemon.js";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const maxPokeId = 1017;
const maxImgId = 1011;
let idOrName;
let pokemon;

// Méthode pour rechercher/récupérer le pokémon depuis l'API
const getPokemon = async (search) => {
    try {
        const response = await fetch(baseUrl + search);
        const data = await response.json();
        pokemon = new Pokemon(
            data.id,
            data.name.substring(0, 1).toUpperCase() + data.name.substring(1),
            data.height,
            data.weight,
            data.types.map(element => element.type.name.substring(0,1).toUpperCase() + element.type.name.substring(1)),
            data.abilities.map(element => element.ability.name.substring(0,1).toUpperCase() + element.ability.name.substring(1)),
            data.id < maxImgId
            ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id.toString().padStart(3, "0")}.png`
            : "assets/images/Poke_Ball.webp"
        );
        return pokemon;
    } catch (error) {
        console.error(error);
    }
}

// Méthode pour afficher les données du pokémon
const displayPokemon = (pokemon) => {
    document.querySelector("title").textContent = `Pokémon - ${pokemon.name}`;
    document.querySelector("#poke-name").textContent = `# ${pokemon.id} - ${pokemon.name}`;
    document.querySelector("#poke-height").textContent = `Height : ${pokemon.height} units`;
    document.querySelector("#poke-weight").textContent = `Weight : ${pokemon.weight} units`;

    const typesDisplay = document.querySelector("#poke-types");
    const abilitiesDisplay = document.querySelector("#poke-abilities");

    typesDisplay.textContent = "";
    abilitiesDisplay.textContent = "";
    
    pokemon.types.forEach(type => {
        const newLi = document.createElement("li");
        newLi.textContent = type;
        typesDisplay.appendChild(newLi);
    });

    pokemon.abilities.forEach(type => {
        const newLi = document.createElement("li");
        newLi.textContent = type;
        abilitiesDisplay.appendChild(newLi);
    });
    
    const imgDisplay = document.querySelector("#poke-image");
    imgDisplay.setAttribute("src", pokemon.imageUrl);
    imgDisplay.setAttribute("alt", pokemon.name);
}

// Méthode pour rechercher puis afficher un pokémon
const updatePage = async (pokeIdOrName) => {
    try {
        const pokemon = await getPokemon(pokeIdOrName);
        displayPokemon(pokemon);
    } catch (error) {
        console.error(error);
    }
}

// Méthode pour générer un ID aléatoire
const randomId = () => Math.floor(Math.random() * maxPokeId);

// Récupération des infos d'un pokémon aléatoire
updatePage(randomId());

// Recherche de pokémon
document.querySelector("#search").addEventListener("submit", async (event) => {
    event.preventDefault();

    idOrName = document.querySelector("form#search input").value;

    if (idOrName == "") {
        idOrName = randomId();
    } else if (idOrName < 1) {
        idOrName = 1;
    } else if (idOrName > maxPokeId) {
        idOrName = maxPokeId;
    }

    updatePage(idOrName);
})

// Pokémon précédent
document.querySelector("#prev").addEventListener("click", async () => {
    if (pokemon.id > 1) {
        idOrName = pokemon.id - 1;
        updatePage(idOrName);
    }
})

// Pokémon suivant
document.querySelector("#next").addEventListener("click", async () => {
    if (pokemon.id < maxPokeId) {
        idOrName = pokemon.id + 1;
        updatePage(idOrName);
    }
})