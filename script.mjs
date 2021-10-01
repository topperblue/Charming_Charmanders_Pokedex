// import fetch from "node-fetch"


// for (let i = 1; i <= 150; i++) {
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     fetch(url)
//       .then(res => res.json())
//       .then(pokemon => {
//         console.log(pokemon);
//       });
// }

const number = document.getElementById('number');
const name = document.getElementById('name');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const form = document.getElementById('form');
const userSearch = document.getElementById('query');
var baseUrl = "https://pokeapi.co/api/v2/pokemon/"

async function searchPokeAPI(event) {
  event.preventDefault();
  const pokeUrl = baseUrl + userSearch.value + "/";
  const data = await fetch(pokeUrl);
  const json = await data.json();
  document.getElementById("number").innerText = json.id;
  document.getElementById("name").innerHTML = json.name;
  document.getElementById("height").innerHTML = json.height +"m";
  document.getElementById("weight").innerHTML = json.weight +"kg";

  //console.log(json.name);
}

form.addEventListener('submit', searchPokeAPI);
