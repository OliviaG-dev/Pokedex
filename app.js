let allPokemon = [];
let arrayFinish = [];

const searchInput = document.querySelector(".search__pokemon input");

function pokemonFetch() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((reponse) => reponse.json())
    .then((allPoke) => {
      allPoke.results.forEach((pokemon) => {
        allPokemonFetch(pokemon);
      });
    });
}

pokemonFetch();

function allPokemonFetch(data) {

  let objPokemonFull = {};
  let url = data.url
  let namePokemon = data.name;
  
  fetch(url)
  .then(reponse => reponse.json())
  .then((pokemonData) => {
    //console.log(pokemonData);
    objPokemonFull.picture = pokemonData.sprites.front_default;
    objPokemonFull.type = pokemonData.types[0].type.name
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
    .then(response => response.json())
    .then((pokemonData) => {
          //console.log(pokemonData);
          objPokemonFull.name = pokemonData.names[4].name;
          allPokemon.push(objPokemonFull)

          if (allPokemon.length === 151) {
            console.log(allPokemon);
          }
    })
  })
}


//Animation input

searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("input__active");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("input__active");
  }
});
