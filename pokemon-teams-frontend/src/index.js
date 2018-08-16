const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () =>{

  renderTrainers()

  function getAllTrainers(){
    return fetch(TRAINERS_URL)
      .then(res => res.json())
  }

  function addPokemonToList(e){
    const trainerID = e.target.dataset.id
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trainer_id: trainerID})
    })
      .then(res => res.json())
      .then(errors =>{
        if(errors.error){
          alert(errors.error)
        }
      })
      .then(renderTrainers)
  }

  function removePokemon(e){
    const pokemonId = e.target.dataset.id
    fetch(`${POKEMONS_URL}/${pokemonId}`,{
      method: 'DELETE'
    })
    .then(renderTrainers)
  }

  function removeTrainer(e){
    const trainerID = e.target.dataset.id
    fetch(`${TRAINERS_URL}/${trainerID}`,{
      method: 'DELETE'
    })
    .then(renderTrainers)
  }

  function renderPokemon(trainer, list){
    trainer.pokemons.forEach((mon) => {
      const lili = document.createElement('li')
      const releaseBttn = createReleaseButton(mon)
      lili.dataset.id = mon.id
      lili.innerText = `${mon.nickname} (${mon.species})`
      lili.append(releaseBttn)
      list.append(lili)
    })
  }

  function createAddButton(trainer){
    const addBttn = document.createElement('button')
    addBttn.dataset.id = trainer.id
    addBttn.innerText = "Add Pokemon"
    addBttn.addEventListener('click', addPokemonToList)
    return addBttn
  }

  function createReleaseButton(mon){
    const releaseBttn = document.createElement('button')
    releaseBttn.dataset.id = mon.id
    releaseBttn.innerText = 'Release'
    releaseBttn.classList.add('release')
    releaseBttn.addEventListener('click', removePokemon)
    return releaseBttn
  }

  function createDeleteTrainer(trainer){
    const deleteTrainerBttn = document.createElement('button')
    deleteTrainerBttn.dataset.id = trainer.id
    deleteTrainerBttn.innerText = 'Remove Trainer'
    deleteTrainerBttn.addEventListener('click', removeTrainer)
    return deleteTrainerBttn
  }

  function renderTrainers(){
    getAllTrainers().then((data) => {
      const mainny = document.getElementsByTagName('main')
      mainny[0].innerText = ''
      data.forEach(trainer => {
        const divvy = document.createElement('div')
        divvy.dataset.id = trainer.id
        divvy.classList.add('card')
        const deleteTrainer = createDeleteTrainer(trainer)
        const pipi = document.createElement('p')
        pipi.innerText = trainer.name
        const addBttn = createAddButton(trainer)
        const ully = document.createElement('ul')
        ully.id = "pokeList"
        divvy.append(pipi, addBttn, deleteTrainer, ully)
        renderPokemon(trainer, ully)
        mainny[0].append(divvy)
      })
    })
  }

})
