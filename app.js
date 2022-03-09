let allPokemon = [];
let arrayFinish = [];
const listPokemon = document.querySelector(".list__pokemon");
const searchInput = document.querySelector(".search__pokemon input");

const typesBackground = {
  grass: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(120,200,80,1) 100%)`,
  ground: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(226,191,101,1) 100%)`,
  dragon: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(111,53,252,1) 100%)`,
  fire: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(245,130,113,1) 100%)`,
  electric: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(247,208,44,1) 100%)`,
  fairy: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(214,133,173,1) 100%)`,
  poison: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(150,109,163,1) 100%)`,
  bug: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(179,245,148,1) 100%)`,
  water: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(99,144,240,1) 100%)`,
  normal: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(217,213,216,1) 100%)`,
  psychic: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(249,85,135,1) 100%)`,
  flying: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(169,143,243,1) 100%)`,
  fighting: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(194,89,86,1) 100%)`,
  rock: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(182,161,54,1) 100%)`,
  ghost: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(115,87,151,1) 100%)`,
  ice: `linear-gradient(75deg, rgba(242,242,242,1) 0%, rgba(150,217,214,1) 100%)`,
};

const typesBorder = {

  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
}

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
  let url = data.url;
  let namePokemon = data.name;

  fetch(url)
    .then((reponse) => reponse.json())
    .then((pokemonData) => {
      //console.log(pokemonData);
      objPokemonFull.picture = pokemonData.sprites.front_default;
      objPokemonFull.type = pokemonData.types[0].type.name;
      objPokemonFull.id = pokemonData.id;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
        .then((response) => response.json())
        .then((pokemonData) => {
          //console.log(pokemonData);
          objPokemonFull.name = pokemonData.names[4].name;
          allPokemon.push(objPokemonFull);

          if (allPokemon.length === 151) {
            console.log(allPokemon);
            arrayFinish = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);
            //console.log(arrayFinish);

            createCard(arrayFinish);
          }
        });
    });
}

//card creation

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("li");
    let colorBackground = typesBackground[arr[i].type];
    card.style.background = colorBackground;
    card.style.borderColor = typesBorder[arr[i].type];
    const titleCard = document.createElement("h5");
    titleCard.innerText = arr[i].name;
    const idCard = document.createElement("p");
    idCard.innerText = `ID# ${arr[i].id}`;
    const imgCard = document.createElement("img");
    imgCard.src = arr[i].picture;

    card.appendChild(imgCard);
    card.appendChild(titleCard);
    card.appendChild(idCard);

    listPokemon.appendChild(card);
  }
}

// Sroll infini
window.addEventListener('scroll', () => {

  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if(clientHeight + scrollTop >= scrollHeight - 20) {
    addPokemon(6);
  }
})

let index = 21;

function addPokemon(nb) {
  if(index > 151) {
    return;
  }
  const arrToAdd = allPokemon.slice(index, index + nb);
  createCard(arrToAdd);
  index += nb;
}

//Search
searchInput.addEventListener('keyup', search);

function search(){

  if(index < 151) {
    addPokemon(130);
  }
}


//Animation input

searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("input__active");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("input__active");
  }
});
