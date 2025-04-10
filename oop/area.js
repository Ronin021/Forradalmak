// Segédfüggvény: létrehoz egy div-et a megadott osztálynévvel
function makeDiv(className) {
    const div = document.createElement('div')
    div.className = className
    return div
}

// Area osztály: egy div-et hoz létre, amit hozzáad egy közös 'oopcontainer'-hez
class Area {

    #div // Privát mező: ide kerül a létrehozott div elem

    // Getter: kívülről elérhetővé teszi a privát div-et
    get div(){
        return this.#div
    }

    constructor(className) {
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

    constructor(cssClass){
        super(cssClass) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez

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
    }
}

// Form osztály: örökli az Area-t, létrehoz egy űrlapot a megadott mezőkkel
class Form extends Area {
    constructor(cssClass, fieldList){
        super(cssClass) // Meghívjuk az Area konstruktorát

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
    }
}
