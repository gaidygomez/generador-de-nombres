const btn = document.querySelector('input.button-primary')
const origen = document.getElementById('origen')
const gender = document.getElementById('genero')
const length = document.getElementById('numero')
let interfaz

class Interfaz{
    selection(data){
        let html = ''
        html += `<ul class="lista">`
            data.map((datos) =>{
                html += `<li>${datos.name.first} ${datos.name.last}</li>`
            })
        html += `</ul>`

        document.getElementById('resultado').innerHTML = html
    }

    error(){
        const div = document.createElement('div')
        div.classList.add('error')
        div.appendChild(document.createTextNode('Debe escoger género y origen para generar'))
        document.getElementById('generar-nombre').insertBefore(div, document.querySelector('div.row'))

        setTimeout(() => {
            document.querySelector('.error').remove()
        }, 2000);
    }
}

btn.addEventListener('click', (event) => {
    event.preventDefault()
    interfaz = new Interfaz()
    if (gender.value === '' || origen.value === '') {
        interfaz.error()
    } else {
        apiData(gender.value, origen.value, length.value)
    }
})

function apiData(gen, ori, lon) {
    fetch(`https://randomuser.me/api/?nat=${ori}&gender=${gen}&results=${lon}&inc=gender,name,nat`)
        .then(res => res.json())
        .then((data) => {
            interfaz.selection(data.results)
        })
        .catch((err) => {
            console.log(err);
        });
}



