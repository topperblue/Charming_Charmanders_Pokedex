// import fetch from "node-fetch"


// for (let i = 1; i <= 150; i++) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     fetch(url)
//       .then(res => res.json())
//       .then(pokemon => {
//         console.log(pokemon);
//       });
// }

const result = document.getElementById('result');
const form = document.getElementById('form');
const userSearch = document.getElementById('query');
var baseUrl = "https://pokeapi.co/api/v2/pokemon/"
let pokeNum = 0;
//test
async function searchPokeAPI(event) {
  event.preventDefault();
  const pokeUrl = baseUrl + userSearch.value + "/";
  const data = await fetch(pokeUrl);
  const json = await data.json();
  result.innerHTML = json.name;
  pokeNum = json.id;
  console.log(json.name);
}
form.addEventListener('submit', searchPokeAPI);

async function scrollUp(event) {
    event.preventDefault();
    pokeNum += 1;
    if (pokeNum > 151) {
        pokeNum = 151;
    }
    const pokeUrl = baseUrl + (pokeNum) + "/";
    const data = await fetch(pokeUrl);
    const json = await data.json();
    result.innerHTML = json.name;
    console.log(json.name);
  }
  document.getElementById("up").addEventListener("click", scrollUp);

  async function scrollDown(event) {
    event.preventDefault();
    pokeNum -= 1;
    if (pokeNum < 1) {
        pokeNum = 1;
    }
    const pokeUrl = baseUrl + (pokeNum) + "/";
    const data = await fetch(pokeUrl);
    const json = await data.json();
    result.innerHTML = json.name;
    console.log(json.name);
  }
  document.getElementById("down").addEventListener("click", scrollDown);
