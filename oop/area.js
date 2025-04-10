// Segédfüggvény: létrehoz egy div-et a megadott osztálynévvel
function makeDiv(className) {
    const div = document.createElement('div')
    div.className = className
    return div
}

// Area osztály: egy div-et hoz létre, amit hozzáad egy közös 'oopcontainer'-hez
class Area {

    #div // Privát mező: ide kerül a létrehozott div elem

    #manager // Privát mező: ide kerül a Manager példány

    get manager() {
        return this.#manager // Getter: visszaadja a manager példányt
    }

    // Getter: kívülről elérhetővé teszi a privát div-et
    get div(){
        return this.#div
    }



    constructor(className, manager) {
        this.#manager = manager // Beállítjuk a manager példányt
        const container = this.#getContainerdiv() // Lekérjük vagy létrehozzuk a közös konténert

        this.#div = document.createElement('div') // Új div létrehozása
        this.#div.className = className // Beállítjuk az osztálynevét

        container.appendChild(this.#div) // Hozzáadjuk a konténerhez
    }

    // Privát metódus: visszaadja a közös konténer div-et, vagy létrehozza, ha nem létezik
    #getContainerdiv(){
        let divcontainer = document.querySelector('.oopcontainer') // Keresés az oldalon

        if (!divcontainer) {
            divcontainer = document.createElement('div') // Új <div> létrehozása
            divcontainer.className = 'oopcontainer' // Class beállítása
            document.body.appendChild(divcontainer) // Hozzáadjuk a body-hoz
        }

        return divcontainer
    }
}

// Table osztály: örökli az Area-t, és létrehoz benne egy táblázatot fejléccel és tbody-val
class Table extends Area {

    constructor(cssClass, manager) {
        super(cssClass, manager) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez
        const tabla = this.#makeTable() // privát metodus meghívása, ami létrehozza a táblázatot
                
        this.manager.setAddAdatCallback((adat) => { // Callback beállítása, amit új adat hozzáadásakor hívunk meg
            const row = document.createElement('tr') // Új sor létrehozása
            tabla.appendChild(row) // Hozzáadjuk a tbodyhoz
            const forradalomcell = document.createElement('td') // Új cella létrehozása
            forradalomcell.textContent = adat.forradalom // Beállítjuk a cella szövegét

            row.appendChild(forradalomcell) // Hozzáadjuk a sorhoz
            
            
            const evszamcell = document.createElement('td') // Új cella létrehozása
            evszamcell.textContent = adat.evszam // Beállítjuk a cella szövegét
            row.appendChild(evszamcell) // Hozzáadjuk a sorhoz

            const sikerescella = document.createElement('td') // Új cella létrehozása
            sikerescella.textContent = adat.sikeres // Beállítjuk a cella szövegét
            row.appendChild(sikerescella) // Hozzáadjuk a sorhoz
        })
    }

#makeTable() { // Privát metódus: létrehozza a táblázatot
        const table = document.createElement('table') // Létrehozunk egy <table> elemet
        this.div.appendChild(table) // Hozzáadjuk a div-hez

        const thead = document.createElement('thead') // Fejléc rész
        table.appendChild(thead)

        const theadrow = document.createElement('tr') // Fejléc sor
        thead.appendChild(theadrow)

        const cella = ['forradalom', 'evszam', 'sikeres'] // Fejléc oszlopnevek

        for (const cellacontent of cella) {
            const theadcella = document.createElement('th') // Fejléc cella
            theadcella.innerText = cellacontent // Cella tartalma
            theadrow.appendChild(theadcella) // Hozzáadás a sorhoz
        }

        const tbody = document.createElement('tbody') // Törzsrész létrehozása
        table.appendChild(tbody) // Hozzáadjuk a táblázathoz

        this.tbody = tbody // Mentjük példányváltozóként, ha később használni akarjuk

        return tbody // Visszaadjuk a törzset
}
}

// Form osztály: örökli az Area-t, létrehoz egy űrlapot a megadott mezőkkel
class Form extends Area {
    constructor(cssClass, fieldList, manager) {
        super(cssClass, manager, fieldList) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez
        

        const form = document.createElement('form') // Űrlap elem létrehozása
        this.div.appendChild(form) // Hozzáadjuk a divhez

        // Ha nem adnak meg fieldList-et, alapértelmezett mezőket használunk
        if (!fieldList) {
            fieldList = [
                { fieldid: 'forradalom', fieldLabel: 'forradalom' },
                { fieldid: 'evszam', fieldLabel: 'evszám' },
                { fieldid: 'sikeres', fieldLabel: 'sikeres' }
            ]
        }

        // Végigmegyünk a mezőleírásokon, és mindenhez létrehozunk label + input párost
        for (const fieldElement of fieldList) {
            const field = makeDiv('field') // Egyéni mezőtartó div
            form.appendChild(field)

            const label = document.createElement('label') // Címke
            label.htmlFor = fieldElement.fieldid
            label.textContent = fieldElement.fieldLabel
            field.appendChild(label)

            field.appendChild(document.createElement('br')) // Sortörés

            let input
            if (fieldElement.fieldid === 'sikeres') {
                input = document.createElement('select') // Legördülő mező
                input.id = fieldElement.fieldid

                const optionyes = document.createElement('option')
                optionyes.value = 'igen'
                optionyes.innerText = 'igen'

                const optionno = document.createElement('option')
                optionno.value = 'nem'
                optionno.innerText = 'nem'

                input.appendChild(optionyes)
                input.appendChild(optionno)
            } else {
                input = document.createElement('input') // Alapértelmezett szövegmező
                input.id = fieldElement.fieldid
            }

            field.appendChild(input) // Mező hozzáadása
        }

        const button = document.createElement('button') // Gomb létrehozása
        button.textContent = 'hozzáadás' // Felirat beállítása
        form.appendChild(button) // Gomb hozzáadása az űrlaphoz


        form.addEventListener('submit', (e) => { // Űrlap beküldés eseménykezelő
            e.preventDefault() // Alapértelmezett beküldés megakadályozása
            const valueObject = {} // Üres objektum létrehozása az értékek tárolására

            const inputField = e.target.querySelectorAll('input, select') // Kiválasztjuk az összes input és select mezőt
            for (const input of inputField) { // Végigmegyünk az összes mezőn
                valueObject[input.id] = input.value // Az objektumba mentjük az értékeket
            }

            const adat = new Adat(valueObject.forradalom, valueObject.evszam, valueObject.sikeres) // Új Adat objektum létrehozása
            this.manager.addAdat(adat) // Adat hozzáadása a Managerhez
            
        })
    }
}
