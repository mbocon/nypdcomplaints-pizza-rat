const form = document.querySelector('form');
const div = document.querySelector('#div');
const url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD&borough=';
const MANHATTAN = document.querySelector('#MANHATTAN')
const BRONX = document.querySelector('#BRONX')
const QUEENS = document.querySelector('#QUEENS')
const BROOKLYN = document.querySelector('#BROOKLYN')
const STATENISLAND = document.querySelector('#STATENISLAND')
let BOROUGH;

MANHATTAN.addEventListener('click', (e)=>{
    BOROUGH = 'MANHATTAN'
})

BRONX.addEventListener('click', (e)=>{
    BOROUGH = 'BRONX'
})

QUEENS.addEventListener('click', (e)=>{
    BOROUGH = 'QUEENS'
})

BROOKLYN.addEventListener('click', (e)=>{
    BOROUGH = 'BROOKLYN'
})

STATENISLAND.addEventListener('click', (e)=>{
    BOROUGH = 'STATEN ISLAND'
})


const getData = (event) => {
    event.preventDefault()
    div.innerHTML = ''
    let requestedNum = document.querySelector('#input').value;
  
    fetch(url+BOROUGH)
    .then(res => res.json())
    .then(data => {
        let results;
        if(!requestedNum){
            results = data.splice(0, 10)
        } else{
            results =  data.splice(0, requestedNum)
        }
      
        results.forEach(result => {
            const div2 = document.createElement('div')
            div.classList.add('div2')
            const p = document.createElement('p')
            p.innerText =  result.descriptor
            div2.appendChild(p)

            const p2  = document.createElement('p');
            p2.innerText = result.resolution_description;
            p2.style.display = 'none';
            p.appendChild(p2)

            const button = document.createElement('button')
            button.innerText = "What did the Police do?";
            button.addEventListener('click', (e)=>{
                if(p2.style.display === 'none'){
                    p2.style.display= 'block';
                } else  {
                    p2.style.display= 'none';
                }
                
            })
            div2.appendChild(button)
            div.appendChild(div2)
        })
    })
    .catch(err  => console.log(err))
}

form.addEventListener('submit', getData)