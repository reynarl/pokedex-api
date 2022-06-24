let btnSearch = document.getElementById('btnSearch')
let btnBack = document.getElementById('btnBack')
let pokedexBody = document.getElementById('pokedex-body')
let getPokemon = document.getElementById('getPokemon')
let getName = document.getElementById('getName')
let showPokemon = document.getElementById('showPokemon')
getPokemon.style.display = 'none'


//evento al dar click en buscar
btnSearch.addEventListener('click',()=>{

  let names = getName.value.toLowerCase()
  fetch(`https://pokeapi.co/api/v2/pokemon/${names}`)
  .then(resp => resp.json())
  .then(data =>{
    pokedexBody.style.display = 'flex',
    getPokemon.style.display = 'block',
    showPokemon.style.display = 'none'

    const { 
      types:[{type:{name:type_name}}], sprites:{other:{home:{front_default}}}, 
      name, height, weight, id, stats, sprites:{versions:{'generation-v':gv}}
    } = data

    let pokeHeight = document.getElementById('pokeHeight')
    let pokeWeight = document.getElementById('pokeWeight')
    let pokeImage = document.getElementById('pokeImage')
    let pokeNum = document.getElementById('pokeNum')
    let pokeName = document.getElementById('pokeName')
    let pokeType = document.getElementById('pokeType')

    //Mostrando los datos
    pokeHeight.innerHTML = `<img src="${gv['black-white'].animated['back_default']}">${height/10} m`
    pokeWeight.innerHTML = `<img src="${gv['black-white'].animated['front_default']}">${weight/10} kg`
    pokeImage.src = `${front_default}`
    pokeNum.innerHTML = `N. 0${id}`
    pokeName.innerHTML = `${name}`
    pokeType.innerHTML = `${type_name}`


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
      <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${stats.base_stat}%;" aria-valuenow="${stats.base_stat}" aria-valuemin="0" aria-valuemax="100">${stats.base_stat}%</div></div>
      `
    })

    getName.value = ''

  })
  .catch(error=>{
    let msgEror = document.getElementById('msgError')
    getPokemon.style.display = 'none'
    showPokemon.style.display = 'flex'
    msgEror.innerHTML = `⚠️ Pokemon no encontrado, ingresa un nuevo nombre`
    setTimeout(() => {
      msgEror.innerHTML = ''
    }, 2000);
  })

})

//pokebola (boton) de inicio
btnBack.addEventListener('click',()=>{
  location.reload()
})

//Obtener los pokemones
setTimeout(()=>{
  for(let i=40;i<73;i++){
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