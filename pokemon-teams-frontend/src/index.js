const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  renderTrainers()
})

async function fetchTrainers() {
  const response = await fetch(TRAINERS_URL)
  const data = await response.json()
  return data
}

async function postPokemon(trainerId) {
  const data = {trainer_id: trainerId}
  const response = await fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
     "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  })
  renderTrainers()
  return response.json()
}

async function deletePokemon(id) {
  const response = await fetch(`${POKEMONS_URL}/${id}`, {
    method: "DELETE"
  })
  renderTrainers()
  return response.json()
}

function renderTrainers() {
  const main = document.querySelector('main')
  main.innerHTML = ""
  const trainers = fetchTrainers()
  trainers.then( trainersList => {
    trainersList.forEach( trainer => {
      const trainerDiv = document.createElement('div')
      trainerDiv.innerHTML =
      `
      <div id="trainer-card" class="card" data-id=${trainer.id}>
        <p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id} onclick="createPokemon(${trainer.id})">Add Pokemon</button>
      </div>
      `
      trainer.pokemons.forEach(pokemon => {
        const ul = document.createElement('ul')
        ul.innerHTML =
        `
        <li>${pokemon.nickname} (${pokemon.species})
          <button class="release" data-pokemon-id=${pokemon.id} onclick="releasePokemon(${pokemon.id})">Release</button>
        </li>
        `
        trainerDiv.append(ul)
      })
      main.append(trainerDiv)
    })
  })
}

function createPokemon(id) {
  postPokemon(id)
}

function releasePokemon(id) {
  deletePokemon(id)
}
