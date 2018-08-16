document.addEventListener('DOMContentLoaded', () => {

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

renderTrainers()

function fetchTrainers(){
  return fetch(TRAINERS_URL)
    .then(res => res.json())

}

function removePokemon(id){
  console.log(id)
  const pokemon = `${POKEMONS_URL}/${id}`
  fetch(pokemon, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function createPokemon(trainerObj){
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trainerObj)
  })
    .then(res => res.json())
    .then(error => {
      if (error.error) {
      alert(error.error)
      } 
    })
}

function renderPokemon(pokemon){

}
/////
function renderTrainers() {
  const mainCont = document.getElementById('pokemon-trainers')
  mainCont.innerHTML = ''
  const trainersData = fetchTrainers()
  trainersData.then((trainers) => {
    trainers.forEach(trainer => {
      const card = document.createElement('div')
      card.className = 'card'
      card.dataset.id = trainer.id
      const p = document.createElement('p')
      p.innerHTML = trainer.name
      const addPkm = document.createElement('button')
      addPkm.innerHTML = 'Add Pokemon'
      addPkm.dataset.id = trainer.id

      addPkm.addEventListener('click', () => {
        const trainerObj = {trainer_id: trainer.id}
        const res = createPokemon(trainerObj)
        console.log(res)
        renderTrainers()

        })

      const ul = document.createElement('ul')

      trainer.pokemons.forEach(pokemon => {
        const li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        const releaseBtn = document.createElement('button')
        releaseBtn.className = "release"
        releaseBtn.dataset.pokemonId = pokemon.id
        releaseBtn.innerText = "release"
        releaseBtn.addEventListener('click', () => {
          li.innerHTML = ''
          removePokemon(pokemon.id)
        })
        // append views
        li.append(releaseBtn)
        ul.append(li)
      })

      // append view
      card.append(p, addPkm, ul)
      mainCont.append(card)
    })
  })


  // console.log

}

// function renderPokemon(trainer) {
//   trainer.pokemons.forEach(pokemon => {
//     const li = document.createElement('li')
//     li.innerHTML =
//     `
//       ${pokemon.nickname} (${pokemon.species})
//       <button class='release' dataset-pokemon-id='${pokemon.id}'>Release</button>
//     `
//     card.append(li)
//   })
// }

})
