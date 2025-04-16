const array = [] // létrehozok egy tömböt

// Egy segédfüggvény, ami létrehoz egy <div> elemet a megadott class névvel
const makeDiv = (className) => {
    const div = document.createElement('div') // Létrehozunk egy új <div> elemet
    div.className = className // Beállítjuk a class nevét
    return div // Visszaadjuk az elkészített <div>-et
}

/**
 * @param {Array} adatarray - Az adatok tömbje, amit a táblázatban meg szeretnénk jeleníteni.
 * 
 * @param {Function} callback - A callback függvény, amit új adat hozzáadásakor hívunk meg.
 * 
 * 
 * @returns {Array} - A táblázat adatai a callback szerinti elemekkel.
 */



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


const filtercontainer = document.createElement('div') // Létrehozunk egy új divet a szűrőkhöz
filtercontainer.className = 'filtercontainer' // Beállítjuk a class nevét
divcontainer.appendChild(filtercontainer) // Hozzáadjuk a filtercontainer-t a divcontainer-hez

const filterdivform = document.createElement('div') // Létrehozunk egy új divet a szűrő formhoz
filterdivform.className = 'filterdivform' // Beállítjuk a class nevét
filtercontainer.appendChild(filterdivform) // Hozzáadjuk a filterform-ot a filtercontainer-hez

const filterform = document.createElement('form') // Létrehozunk egy új form elemet
filterdivform.appendChild(filterform) // Hozzáadjuk a filterdivform-hoz

const input = document.createElement('input') // Létrehozunk egy új input elemet
input.type = 'text' // Beállítjuk az input típusát szövegre
input.id = 'filterinput' // Beállítjuk az input id-ját
input.placeholder = 'szűrés' // Beállítjuk az input helyőrző szövegét
filterform.appendChild(input) // Hozzáadjuk az inputot a filterform-hoz

const select = document.createElement('select') // Létrehozunk egy új select elemet

select.id = 'filterselect' // Beállítjuk a select id-ját

const options = ['üres','forradalom', 'evszam', 'sikeres'] // Létrehozzuk az opciók listáját
options.forEach((optiontext) => { // Végigmegyünk az opciókon
    const option = document.createElement('option') // Létrehozunk egy új opciót
    option.value = optiontext // Beállítjuk az opció értékét
    option.textContent = optiontext // Beállítjuk az opció szövegét
    select.appendChild(option) // Hozzáadjuk az opciót a select-hez
})
filterform.appendChild(select) // Hozzáadjuk a select-ot a filterform-hoz


const filterbutton = document.createElement('button') // Létrehozunk egy új gombot
filterbutton.type = 'button' // Beállítjuk a gomb típusát
filterbutton.textContent = 'szűrés' // Beállítjuk a gomb szövegét
form.appendChild(filterbutton) // Hozzáadjuk a gombot a formhoz

const filterResult = document.createElement('div') // Létrehozunk egy új divet a szűrés eredményének megjelenítésére
filterResult.className = 'filterResult' // Beállítjuk a class nevét
filterResult.textContent = 'szűrés eredménye' // Beállítjuk a div szövegét
filtercontainer.appendChild(filterResult) // Hozzáadjuk a filterResult-t a filtercontainer-hez
filterbutton.addEventListener('click', () => { // Eseménykezelő a gomb megnyomására
    const filterinput = document.getElementById('filterinput') // Lekérjük a szűrő inputot
    const filterselect = document.getElementById('filterselect') // Lekérjük a szűrő selectet

    const filterValue = filterinput.value // Lekérjük a szűrő input értékét
    const filterSelectValue = filterselect.value // Lekérjük a szűrő select értékét

    if (filterValue === '') { // Ha az input üres
        return // Kilépünk a függvényből
    }

    const filteredArray = array.filter((item) => { // Szűrjük az array-t
        return item[filterSelectValue].toLowerCase().includes(filterValue.toLowerCase()) // Visszaadjuk azokat az elemeket, amik tartalmazzák a szűrő értékét
    })

    filterResult.innerHTML = '' // Ürítjük a szűrés eredményét

    filteredArray.forEach((item) => { // Végigmegyünk a szűrt elemek listáján
        const div = document.createElement('div') // Létrehozunk egy új divet
        div.textContent = `${item.forradalom} (${item.evszam}) - ${item.sikeres}` // Beállítjuk a div szövegét
        filterResult.appendChild(div) // Hozzáadjuk a divet a szűrés eredményéhez
    })
})



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
const error = document.createElement('span') // Hibaüzenet elem létrehozása
error.className = 'error' // Hibaüzenet class beállítása

field.appendChild(error) // Hozzáadjuk a mezőhöz
}



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

const filefeltolto = document.createElement('input') // Fájl feltöltő input létrehozása

divcontainer.appendChild(filefeltolto) // Hozzáadjuk a containerhez

filefeltolto.id = 'filefeltolto' // Beállítjuk az id-t

filefeltolto.type = 'file' // Beállítjuk, hogy fájl típusú legyen

filefeltolto.addEventListener('change', (e) => { // Eseménykezelő a fájl kiválasztására

    const file = e.target.files[0] // Az első fájl kiválasztása
    const reader = new FileReader() // Új FileReader létrehozása
    
    reader.onload = (e) => { // Eseménykezelő a fájl betöltésére
        const filecontent = reader.result.split('\n') // A fájl tartalmának feldolgozása (sorokra bontás)

        const withoutheader = filecontent.slice(1) // Az első sort eltávolítjuk (fejléc)

        for (const line of withoutheader) { // Végigmegyünk a sorokon
            const uressor = line.trim()// Sorok levágása (felesleges szóközök eltávolítása)

            const sor = uressor.split(';') // Sorok feldolgozása (pontosvesszőkel)

            const forradalmak = {
                forradalom: sor[0], // Forradalom neve
                evszam: sor[1], // Évszám
                sikeres: sor[2] // Sikeresség
            }

            array.push(forradalmak) // Hozzáadjuk a tömbhöz

            const tabelrow = document.createElement('tr') // Új sor létrehozása a táblázathoz

            tbody.appendChild(tabelrow) // Hozzáadjuk a táblázathoz

            const forradalomCella = document.createElement('td') // Forradalom cella létrehozása

            forradalomCella.textContent = forradalmak.forradalom // Cella szövegének beállítása
            tabelrow.appendChild(forradalomCella) // Cella hozzáadása a sorhoz

            const evszamCella = document.createElement('td') // Évszám cella létrehozása
            evszamCella.textContent = forradalmak.evszam // Cella szövegének beállítása
            tabelrow.appendChild(evszamCella) // Cella hozzáadása a sorhoz

            const sikerCella = document.createElement('td') // Sikeres cella létrehozása
            sikerCella.textContent = forradalmak.sikeres // Cella szövegének beállítása
            tabelrow.appendChild(sikerCella) // Cella hozzáadása a sorhoz
}
        }
    reader.readAsText(file) // Fájl beolvasása szövegként

})

const letoltesbutton = document.createElement('button') // Letöltés gomb létrehozása
letoltesbutton.textContent = 'letöltés' // Gomb szövegének beállítása

divcontainer.appendChild(letoltesbutton) // Gomb hozzáadása a containerhez

letoltesbutton.addEventListener('click', () => { // Eseménykezelő a gomb megnyomására
    const link = document.createElement('a') // Új hivatkozás létrehozása

    const letoltesTomb = ['forradalom;evszam;sikeres'] // Letöltési tömb létrehozása

    for (const forradalmak of array) { // Végigmegyünk a tömbön
        const sor = `${forradalmak.forradalom};${forradalmak.evszam};${forradalmak.sikeres}` // Sor létrehozása
        letoltesTomb.push(sor) // Sor hozzáadása a letöltési tömbhöz
    }

    const letoltesString = letoltesTomb.join('\n') // Tömb összefűzése szöveggé (sorokkal elválasztva)
    const blob = new Blob([letoltesString]) // Blob létrehozása a szövegből

    link.href = URL.createObjectURL(blob) // Hivatkozás beállítása a Blob-ra

    link.download = 'newdata.csv' // Letöltési név beállítása

    link.click() // Hivatkozás "megnyomása" (letöltés elindítása)

    URL.revokeObjectURL(link.href) // Blob URL visszavonása
})