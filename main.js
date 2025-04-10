const array = [] // létrehozok egy tömböt

// Egy segédfüggvény, ami létrehoz egy <div> elemet a megadott class névvel
const makeDiv = (className) => {
    const div = document.createElement('div') // Létrehozunk egy új <div> elemet
    div.className = className // Beállítjuk a class nevét
    return div // Visszaadjuk az elkészített <div>-et
}

// Létrehozunk egy 'container' class nevű divet
const divcontainer = makeDiv('container')

// Hozzáadjuk a divcontainer-t a dokumentum body-jához
document.body.appendChild(divcontainer)

// Létrehozunk egy 'table' class nevű divet
const divtable = makeDiv('table')

// A divtable-t hozzáadjuk a containeren belülre
divcontainer.appendChild(divtable)

// Létrehozunk egy <table> elemet
const table = document.createElement('table')

// A táblázatot hozzáadjuk a korábban létrehozott 'divtable' elemhez
divtable.appendChild(table)

// Létrehozunk egy <thead> elemet (táblázat fejléce)
const thead = document.createElement('thead')

// A <thead>-et hozzáadjuk a táblázathoz
table.appendChild(thead)

// Létrehozunk egy sort a <thead>-hez
const theadrow = document.createElement('tr')

// A sort hozzáadjuk a <thead>-hez
thead.appendChild(theadrow)

// Oszlopnevek listája
const cella = ['forradalom', 'evszam', 'sikeres']

// Végigmegyünk az oszlopneveken, és létrehozunk hozzájuk egy-egy <th> cellát
for (const cellacontent of cella) {
    const theadcella = document.createElement('th') // Új fejléc cella
    theadcella.innerText = cellacontent // Beállítjuk a cella szövegét
    theadrow.appendChild(theadcella) // Hozzáadjuk a cellát a sorhoz
}

// Létrehozunk egy <tbody> elemet (táblázat törzse)
const tbody = document.createElement('tbody')

// A <tbody>-t hozzáadjuk a táblázathoz
table.appendChild(tbody)

// Létrehozunk egy 'form' class nevű divet
const divform = makeDiv('form')

// Létrehozunk egy <form> elemet
const form = document.createElement('form')

// A <form>-ot hozzáadjuk a form divhez
divform.appendChild(form)

// Mezőket leíró tömb: minden mező egy objektum (id + címke szöveg)
const fieldList = [
    { fieldid: 'forradalom', fieldLabel: 'forradalom' },
    { fieldid: 'evszam', fieldLabel: 'evszám' },
    { fieldid: 'sikeres', fieldLabel: 'sikeres' }
]

// Végigmegyünk minden mezőn
for (const fieldElement of fieldList) {
    const field = makeDiv('field') // Létrehozunk egy új mező konténert
    form.appendChild(field) // Hozzáadjuk a formhoz

    const label = document.createElement('label') // Létrehozunk egy <label>-t
    label.htmlFor = fieldElement.fieldid // Beállítjuk, hogy melyik inputhoz tartozik
    label.textContent = fieldElement.fieldLabel // A címke szövege
    field.appendChild(label) // Címkét hozzáadjuk a mezőhöz

    field.appendChild(document.createElement('br')) // Sortörés a label és input közé


   
    let input // Input változó deklarálása

    if (fieldElement.fieldid === 'sikeres') {
        input = document.createElement('select') // A "sikeres" mező legyen legördülő
        input.id = fieldElement.fieldid

        const optionyes = document.createElement('option') // "igen" opció
        optionyes.value = 'igen'
        optionyes.innerText = 'igen'

        const optionno = document.createElement('option') // "nem" opció
        optionno.value = 'nem'
        optionno.innerText = 'nem'

        input.appendChild(optionyes) // Hozzáadjuk az "igen" opciót
        input.appendChild(optionno) // Hozzáadjuk a "nem" opciót
    } else {
        input = document.createElement('input') // Normál input
        input.id = fieldElement.fieldid
    }

    field.appendChild(input) // Hozzáadjuk az inputot a mezőhöz
}
const error = document.createElement('span') // Hibaüzenet elem létrehozása
error.className = 'error' // Hibaüzenet class beállítása

field.appendChild(error) // Hozzáadjuk a mezőhöz


// Gomb létrehozása és hozzáadása a formhoz
const button = document.createElement('button')
button.textContent = 'hozzáadás'
form.appendChild(button)

// Űrlap beküldés eseménykezelő
form.addEventListener('submit', (e) => {
    e.preventDefault() // Megakadályozzuk az alapértelmezett beküldést

    const valueObject = {} // Itt tároljuk az input mezők értékeit

    // Lekérjük az összes input és select mezőt
    const inputField = e.target.querySelectorAll('input, select')

    // Feltöltjük az objektumot a mezők id-jával és értékével
    for (const inputFields of inputField) {
        valueObject[inputFields.id] = inputFields.value
    }

    let valid = true // Kezdetben érvényesnek tekintjük az űrlapot


    for(const inputFields of inputField) {

        const errorfield = inputFields.parentElement.querySelector('.error') // Kiválasztjuk a hibaüzenet mezőt
        

        if(!errorfield) { // Ha nincs hibaüzenet mező, akkor létrehozzuk
            console.error('nincs hibaüzenet mező')

            return}

        errorfield.textContent = '' // Üres hibaüzenet

        if (inputFields.value === '') { // Ha az input mező üres
            errorfield.textContent = 'Kötelező mező' // Hibaüzenet beállítása
            valid = false // Érvénytelen űrlap
        }

        valueObject[inputFields.id] = inputFields.value // Az objektum feltöltése az input mező értékével
    }

    if (!valid) { // Ha az űrlap érvénytelen

    // Új sor létrehozása a táblázathoz
    const tabelrow = document.createElement('tr')
    tbody.appendChild(tabelrow)

    // Forradalom cella létrehozása és hozzáadása
    const forradalomCella = document.createElement('td')
    forradalomCella.textContent = valueObject.forradalom
    tabelrow.appendChild(forradalomCella)

    // Évszám cella létrehozása és hozzáadása
    const evszamCella = document.createElement('td')
    evszamCella.textContent = valueObject.evszam
    tabelrow.appendChild(evszamCella)

    // Sikeres cella létrehozása és hozzáadása
    const sikerCella = document.createElement('td')
    sikerCella.textContent = valueObject.sikeres
    tabelrow.appendChild(sikerCella)
    }
})

// A divform-ot is hozzáadjuk a containerhez
divcontainer.appendChild(divform)
