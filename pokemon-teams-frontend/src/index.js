const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  renderTrainers()
})

async function fetchTrainers() {
  const resp = await fetch(TRAINERS_URL)
  return resp.json()
}

async function fetchTrainer(id) {
  const resp = await fetch(`${TRAINERS_URL}/${id}`)
  return resp.json()
}

async function postPokemon(body) {
  const resp = await fetch(POKEMONS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  return resp.json()
}

async function deletePokemon(id) {
  await fetch(`${POKEMONS_URL}/${id}`, {
    method: "DELETE"
  })
}

function renderTrainers() {
  const mainTag = document.querySelector("main")
  mainTag.innerHTML = ""

  const trainerData = fetchTrainers()

  trainerData.then(trainers => {
    trainers.forEach(trainer => {
      const div = document.createElement("div")
      div.className = "card"
      div.dataset.id = trainer.id

      const p = document.createElement("p")
      p.innerText = trainer.name

      const addBtn = document.createElement("button")
      addBtn.innerText = "Add Pokemon"
      addBtn.onclick = () => addPokemon(trainer.id)

      const ul = document.createElement("ul")

      trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        const releaseBtn = document.createElement("button")
        releaseBtn.className = "release"
        releaseBtn.dataset.pokemonId = pokemon.id
        releaseBtn.innerText = "Release"
        releaseBtn.onclick = () => removePokemon(pokemon.id)
        li.append(releaseBtn)

        ul.append(li)
      })

      div.append(p, addBtn, ul)
      mainTag.append(div)
    })
  })
}

// function renderTrainer(trainerId) {
//   trainerCard = document.querySelector(`div.card[data-id="${CSS.escape(trainerId)}"]`)
//
//   trainerData = fetchTrainer(trainerId)
//   trainerData.then(trainer => {
//
//   })
// }

function addPokemon(trainerId) {
  const body = { trainer_id: trainerId }
  const response = postPokemon(body)
  response.then(res => {
    if(res.error) {
      alert(res.error)
    }
    else {
      renderTrainers()
    }
  })
}

function removePokemon(pokemonId) {
  const response = deletePokemon(pokemonId)
  response.then(res => {
    if(res) {
      alert(res.error)
    }
    else {
      renderTrainers()
    }
  })
}
