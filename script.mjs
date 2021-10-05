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


/***********************************
UPDATING ALL INFO FUNCTION
***********************************/

async function updateInfo(event, pokeUrl) {
  const data = await fetch(pokeUrl);
  const json = await data.json();

  pokeNum = json.id
  hp.innerHTML = json.stats[0].base_stat + "hp";
  result.innerHTML = json.name;
  number.innerText = json.id;
  name.innerHTML = json.name;
  specialAttack.innerHTML = json.stats[3].base_stat + "special";
  height.innerHTML = json.height +"m";
  weight.innerHTML = json.weight +"kg";
  image.src = json.sprites.front_default;

  console.log(json.name);
}


/***********************************
SEARCH
***********************************/
async function searchPokeAPI(event) {
  event.preventDefault();
  const pokeUrl = baseUrl + userSearch.value + "/";
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
    const pokeUrl = baseUrl + (pokeNum) + "/";
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
  const pokeUrl = baseUrl + (pokeNum) + "/";
  updateInfo(event, pokeUrl);
}
document.getElementById("info").addEventListener("click", displayInfo);