// import fetch from "node-fetch"


// for (let i = 1; i <= 150; i++) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     fetch(url)
//       .then(res => res.json())
//       .then(pokemon => {
//         console.log(pokemon);
//       });
// }


/***********************************
VARIABLES OF INFORMATION
***********************************/

const number = document.getElementById('number');
const name = document.getElementById('name');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const specialAttack = document.getElementById('specialattack');
const hp = document.getElementById('HP');
const form = document.getElementById('form');
const userSearch = document.getElementById('query');
const result = document.getElementById('result');
const image = document.getElementById("pokeImage");
var baseUrl = "https://pokeapi.co/api/v2/pokemon/"
let pokeNum = 0;
let pokeUrl;


/***********************************
UPDATING ALL INFO FUNCTION
***********************************/

async function updateInfo(event, pokeUrl) {
  const data = await fetch(pokeUrl);
  const json = await data.json();

  pokeNum = json.id;
  HP.innerHTML = "hp: " + json.stats[0].base_stat;
  attack.innerHTML = "attack: " + json.stats[1].base_stat;
  defense.innerHTML = "defense: " + json.stats[2].base_stat;
  specialattack.innerHTML = "special attack: " + json.stats[3].base_stat;
  specialdefense.innerHTML = "special defense: " + json.stats[4].base_stat;
  speed.innerHTML = "speed: " + json.stats[5].base_stat;
  result.innerHTML = json.name;
  height.innerHTML = "height: " + json.height +"m";
  weight.innerHTML = "weight: " + json.weight +"kg";
  image.src = json.sprites.front_default;

  console.log(json.name);
}
document.getElementById('info').addEventListener('click', updateInfo(pokeUrl));

/***********************************
SEARCH
***********************************/
async function searchPokeAPI(event) {
  event.preventDefault();
  pokeUrl = baseUrl + userSearch.value + "/";
  try {
    updateInfo(event, pokeUrl)
  } catch (err) {
    result.innerHTML = "DOES NOT EXIST";
    userSearch.value = "NO TYPE";
    // add image in picture screen
  }
  
}
form.addEventListener('submit', searchPokeAPI);



/***********************************
SCROLL UP & DOWN
***********************************/
async function scrollUp(event) {
    event.preventDefault();
    pokeNum += 1;
    if (pokeNum > 151) {
        pokeNum = 151;
    }
    pokeUrl = baseUrl + (pokeNum) + "/";
    updateInfo(event, pokeUrl);
  }
  document.getElementById("up").addEventListener("click", scrollUp);

  async function scrollDown(event) {
    event.preventDefault();
    pokeNum -= 1;
    if (pokeNum < 1) {
        pokeNum = 1;
    }
    const pokeUrl = baseUrl + (pokeNum) + "/";
    updateInfo(event, pokeUrl);
  
  }
  document.getElementById("down").addEventListener("click", scrollDown);


/***********************************
INFO BUTTON
***********************************/
async function displayInfo(event) {
  event.preventDefault();
  pokeUrl = baseUrl + (pokeNum) + "/";
  updateInfo(event, pokeUrl);
}
document.getElementById("info").addEventListener("click", displayInfo);
