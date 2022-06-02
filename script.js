const form = document.querySelector('form');
const div = document.querySelector('#div');
const input = document.querySelector('#input')
const url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD&borough=';
const manhattan = document.querySelector('#MANHATTAN')
const bronx = document.querySelector('#BRONX')
const queens = document.querySelector('#QUEENS')
const brooklyn = document.querySelector('#BROOKLYN')
const sIsland = document.querySelector('#STATENISLAND')

let borough;

manhattan.addEventListener('click', (e) => {
    borough = 'MANHATTAN'
})

bronx.addEventListener('click', (e) => {
    borough = 'BRONX'
})

queens.addEventListener('click', (e) => {
    borough = 'QUEENS'
})

brooklyn.addEventListener('click', (e) => {
    borough = 'BROOKLYN'
})

sIsland.addEventListener('click', (e) => {
    borough = 'STATEN ISLAND'
})


const getData = (event) => {
    event.preventDefault()
    div.innerHTML = ''
    let requestedNum = input.value;
    input.value = '';

    fetch(url + borough)
        .then(res => res.json())
        .then(data => {
            let results;
            if (!requestedNum) {
                results = data.splice(0, 10)
            } else {
                results = data.splice(0, requestedNum)
            }

            results.forEach(result => {
                const div2 = document.createElement('div')
                const p = document.createElement('p')
                const p2 = document.createElement('p');
                const button = document.createElement('button')

                p.innerText = result.descriptor
                button.innerText = "What did the Police do?";
                p2.innerText = result.resolution_description;
                p2.style.display = 'none';

                p.appendChild(p2)
                div2.appendChild(p)
                div2.appendChild(button)
                div.appendChild(div2)

                button.addEventListener('click', (e) => {
                    if (p2.style.display === 'none') {
                        p2.style.display = 'block';
                    } else {
                        p2.style.display = 'none';
                    }
                })
            })
        })
        .catch(err => console.log(err))
}

form.addEventListener('submit', getData)