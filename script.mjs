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

async function searchPokeAPI(event) {
  event.preventDefault();
  const pokeUrl = baseUrl + userSearch.value + "/";
  try {
  const data = await fetch(pokeUrl);
  const json = await data.json();
  result.innerHTML = json.name;
  console.log(json.name);
  } catch (err) {
    result.innerHTML = "DOES NOT EXIST";
    userSearch.value = "NO TYPE";
    // add image in picture screen
  }
  
}

form.addEventListener('submit', searchPokeAPI);
