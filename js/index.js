let btnSearch = document.getElementById('btnSearch')
let btnBack = document.getElementById('btnBack')
let pokedexBody = document.getElementById('pokedex-body')
let getPokemon = document.getElementById('getPokemon')
let getName = document.getElementById('getName')
let showPokemon = document.getElementById('showPokemon')


// oculta la seccion que mostrará un pokemon
getPokemon.style.display = 'none'


//evento al dar click en buscar
btnSearch.addEventListener('click',()=>{
  pokedexBody.style.display = 'flex'
  getPokemon.style.display = 'block'
  showPokemon.style.display = 'none'

  let name = getName.value

  fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
  .then(resp => resp.json())
  .then(data =>{
    const { 
      types:[{type:{name:type_name}}], sprites:{other:{home:{front_default}}}, 
      name, height, weight, id, stats 
    } = data

    let pokeHeight = document.getElementById('pokeHeight')
    let pokeWeight = document.getElementById('pokeWeight')
    let pokeImage = document.getElementById('pokeImage')
    let pokeNum = document.getElementById('pokeNum')
    let pokeName = document.getElementById('pokeName')
    let pokeType = document.getElementById('pokeType')

    //Mostrando los datos
    pokeHeight.innerHTML = `${height/10} m.`
    pokeWeight.innerHTML = `${weight/10} kg.`
    pokeImage.src = `${front_default}`
    pokeNum.innerHTML = `N. 0${id}`
    pokeName.innerHTML = `${name}`
    pokeType.innerHTML = `${type_name}`

    //remueve los hijos y no se duplican
    while(progressBar.firstChild){
      progressBar.removeChild(progressBar.firstChild)
    }
    while(statList.firstChild){
      statList.removeChild(statList.firstChild)
    }

    //Obteniendo estadísticas del pokemon, recorriendo con ForEach
    stats.forEach((stats)=>{
      let statList = document.getElementById('statList')
      let progressBar = document.getElementById('progressBar')

      //mostrando los datos
      statList.innerHTML += `<li>${stats.stat['name']}</li>`
      progressBar.innerHTML += `
      <div class="progress">
      <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${stats.base_stat}%;" aria-valuenow="${stats.base_stat}" aria-valuemin="0" aria-valuemax="100">${stats.base_stat}%</div>
      </div>
      `
    })

    getName.value = ''

  })
  .catch(error=>{
    console.log(error)
  })

})

//boton de inicio
btnBack.addEventListener('click',()=>{
  // pokedexBody.style.display = 'flex'
  // getPokemon.style.display = 'none'
  // showPokemon.style.display = 'flex'
  location.reload()
})

//Obtener los pokemones
setTimeout(()=>{
  for(let i=1;i<34;i++){
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(resp => resp.json()
    .then(data =>{
      const {name, sprites:{front_default}} = data
      let showPokemon = document.getElementById('showPokemon')
      
      showPokemon.innerHTML += `
      <div class='main-pokemons'>
        <img src="${front_default}">
        <p>${name}</p>
      </div>
      `
    }))
    .catch(error =>{ 
      console.log(error)
    })
  }
}, 3000)