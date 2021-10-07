

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
const HP = document.getElementById('HP');
const form = document.getElementById('form');
const userSearch = document.getElementById('query');
const typeBar = document.getElementById('tbar')
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
  typeBar.value = json.types[0].type.name;
  try {
    typeBar.value += ", " + json.types[1].type.name;
  } catch (e) {}

  

  console.log(json.name);
  console.log(json.location_area_encounters);
}
document.getElementById('info').addEventListener('click', updateInfo(pokeUrl));

/***********************************
SEARCH
***********************************/
async function searchPokeAPI(event) {
  event.preventDefault();
  pokeUrl = baseUrl + userSearch.value + "/";
  try {
    fetch(pokeUrl)
    const data = await fetch(pokeUrl);
    const json = await data.json();
  
    pokeNum = json.id;
    result.innerHTML = json.name;
    number.innerText = json.id;
    name.innerHTML = json.name;
    height.innerHTML = json.height +"m";
    weight.innerHTML = json.weight +"kg";
    image.src = json.sprites.front_default;
    typeBar.value = json.types[0].type.name;
    HP.innerHTML = json.stats[0].base_stat + "hp";
    try {
      typeBar.value += ", " + json.types[1].type.name;
    } catch (e) {}

    console.log(json.name);

  } catch (err) {
    result.innerHTML = "DOES NOT EXIST";
    typeBar.value = "NO TYPE";
    image.src = "HddtBOT.png";
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
        pokeNum = 1;
    }
    pokeUrl = baseUrl + (pokeNum) + "/";
    updateInfo(event, pokeUrl);
  }
  document.getElementById("up").addEventListener("click", scrollUp);

  async function scrollDown(event) {
    event.preventDefault();
    pokeNum -= 1;
    if (pokeNum < 1) {
        pokeNum = 151;
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

/***********************************
MOVES BUTTON
***********************************/
function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');

  for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(array[i].move.name));

      // Add it to the list:
      list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}


async function displayMoves(event) {
  const pokeUrl = baseUrl + (pokeNum) + "/";
  const data = await fetch(pokeUrl);
  const json = await data.json();

  event.preventDefault();
  const movesArray = json.moves;
  const movesList = makeUL(movesArray);

  var parent = document.getElementById("infoScreen")
  var child = document.getElementById("screen-list2");
  parent.replaceChild(movesList, child);
  movesList.classList.add('scroll');
  movesList.id = "screen-list2";
}


document.getElementById("moves").addEventListener("click", displayMoves);


function makeLocationUL(array) {
  // Create the list element:
  var list = document.createElement('ul');

  for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(array[i].location_area.name));

      // Add it to the list:
      list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

async function displayLocations(event) {
  const pokeUrl = baseUrl + (pokeNum) + "/encounters";
  const data = await fetch(pokeUrl);
  const json = await data.json();

  event.preventDefault();
  const locationArray = json;
  const locationList = makeLocationUL(locationArray);

  var parent = document.getElementById("infoScreen")
  var child = document.getElementById("screen-list2");
  parent.replaceChild(locationList, child);
  locationList.classList.add('scroll');
  locationList.id = "screen-list2";
}

document.getElementById("location").addEventListener("click", displayLocations);
