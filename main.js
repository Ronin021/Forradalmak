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
const fieldList = [{
    fieldid: 'forradalom',
    fieldLabel: 'forradalom'
},
{
    fieldid: 'evszam',
    fieldLabel: 'evszám'
},
{
    fieldid: 'sikeres',
    fieldLabel: 'sikeres'
}]

// Végigmegyünk minden mezőn
for (const fieldElement of fieldList) {
    const field = makeDiv('field') // Létrehozunk egy új mező konténert
    form.appendChild(field) // Hozzáadjuk a formhoz

    const label = document.createElement('label') // Létrehozunk egy <label>-t
    label.htmlFor = fieldElement.fieldid // Beállítjuk, hogy melyik inputhoz tartozik
    label.textContent = fieldElement.fieldLabel // A címke szövege
    field.appendChild(label) // Címkét hozzáadjuk a mezőhöz

    let input = document.createElement('input') // Alapértelmezett input
    input.id = fieldElement.fieldid // Beállítjuk az id-t

    field.appendChild(document.createElement('br')) // Sortörés a label és input közé

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

const button = document.createElement('button') // Gomb létrehozása
button.textContent = 'hozzáadás' // Gomb felirata
form.appendChild(button) // Gomb hozzáadása az űrlaphoz

// A divform-ot is hozzáadjuk a containerhez
divcontainer.appendChild(divform)
