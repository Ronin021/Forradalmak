// Segédfüggvény: létrehoz egy div-et a megadott osztálynévvel
function makeDivArea(className) {
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
    #inputtomb // Privát mező: ide kerülnek a létrehozott Formfield mezők
    
    constructor(cssClass, fieldList, manager) {
        super(cssClass, manager, fieldList) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez
        


        this.#inputtomb = [] // Inicializáljuk az input tömböt
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

        for ( const field of fieldList) { // Végigmegyünk a mezők listáján
            const formField = new FormField(field.fieldid, field.fieldLabel) // Új FormField objektum létrehozása
            this.#inputtomb.push(formField) // Hozzáadjuk a tömbhöz
            form.appendChild(formField.getDiv()) // Hozzáadjuk a formhoz

        }

        const submitButton = document.createElement('button') // Létrehozunk egy gombot
        submitButton.textContent = 'hozzáadás' // Beállítjuk a gomb szövegét

        form.appendChild(submitButton) // Hozzáadjuk a formhoz

        form.addEventListener('submit', (e) => { // Űrlap beküldés eseménykezelő
            e.preventDefault() // Alapértelmezett beküldés megakadályozása
            const valueObject = {} // Üres objektum létrehozása az értékek tárolására

            let isValid = true // Érvényesség változó inicializálása

            for (const errorfield of this.#inputtomb) { // Végigmegyünk a mezőkön
                errorfield.error = '' // Töröljük a hibaüzenetet
                if (errorfield.value === '') { // Ha a mező üres
                    errorfield.error = 'Kötelező mező!' // Hibaüzenet beállítása
                    isValid = false // Érvényesség hamisra állítása
                } else {
                    valueObject[errorfield.id] = errorfield.value // Beállítjuk az értéket az objektumban
                }
            }
            if (isValid) { // Ha minden mező érvényes
                const adat = new Adat(valueObject.forradalom, valueObject.evszam, valueObject.sikeres) // Új Adat objektum létrehozása

                this.manager.addAdat(adat) // Hozzáadjuk az adatot a managerhez
            }
        })
    }
}


class Fileupload extends Area {

    constructor(cssClass, manager) {

        super(cssClass, manager) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez
        
        
        const fileupload = document.createElement('input') // Fájl feltöltés elem létrehozása

        fileupload.type = 'file' // Beállítjuk a típusát fájlra
        fileupload.id = 'fileupload' // Beállítjuk az id-t
        this.div.appendChild(fileupload) // Hozzáadjuk a divhez

        fileupload.addEventListener('change', (e) => { // Fájl kiválasztás eseménykezelő

            const selectedFile = e.target.files[0] // Kiválasztott fájl
            const reader = new FileReader() // Fájl olvasó létrehozása

            reader.onload = () => { // Fájl betöltés eseménykezelő

                const sorok = reader.result.split('\n') // Fájl tartalmának feldolgozása (sorokra bontás)

                const adatossorok = sorok.slice(1) // Az első sort eltávolítjuk (fejléc)
                for (const sor of adatossorok) { // Végigmegyünk a sorokon

                    const trimmedSor = sor.trim() // Sorok levágása (felesleges szóközök eltávolítása)

                    const felosztottSor = trimmedSor.split(';') // Sorok felosztása (pontosvesszőkel)

                    const adat = new Adat(
                        felosztottSor[0], // Forradalom neve
                        Number(felosztottSor[1]), // Évszám, csak szám lehet
                        felosztottSor[2]  // Sikeres (igen/nem)
                    )

                    this.manager.addAdat(adat) // Hozzáadjuk az adatot a managerhez
                }
            }
            reader.readAsText(selectedFile) // Fájl olvasása szövegként
        })

        const letoltesbutton = document.createElement('button') // Letöltés gomb létrehozása
        letoltesbutton.textContent = 'letöltés' // Gomb szövegének beállítása

        this.div.appendChild(letoltesbutton) // Hozzáadjuk a divhez


        letoltesbutton.addEventListener('click', () => { // Gomb kattintás eseménykezelő
            const link = document.createElement('a') // Új idéglenes link létrehozása
    
            const tartalom = this.manager.generateOutputString() // Adatok generálása szövegként

            const blob = new Blob([tartalom]) // Blob létrehozása a szövegből

            link.href = URL.createObjectURL(blob) // Hivatkozás beállítása a blobra

            link.download = 'newdataOop.csv'

            link.click() // Kattintás a letöltéshez

            URL.revokeObjectURL(link.href) // Hivatkozás visszavonása
        })

        }
}


class FormField{

    #id // Privát mező: ide kerül az id
    #inputMezo // Privát mező: ide kerül az input/select mező
    #labelElem // Privát mező: ide kerül a label elem
    #hibaElem // Privát mező: ide kerül a hiba üzenet elem

    get id() {
        return this.#id // Getter: visszaadja az id-t
    }

    get value() {
        return this.#inputMezo.value // Getter: visszaadja az input mező értékét
    }

    set error(message) {
        this.#hibaElem.textContent = message // Beállítja a hiba üzenetet
    }

    constructor(id, labeltext) {
        this.#id = id // Beállítjuk az id-t

        this.#labelElem = document.createElement('label') // Létrehozzuk a label elemet
        this.#labelElem.htmlFor = id // Beállítjuk, hogy melyik inputhoz tartozik
        this.#labelElem.textContent = labeltext // Beállítjuk a címke szövegét


        if(id === 'sikeres') { // Ha a mező "sikeres"
            this.#inputMezo = document.createElement('select') // Legördülő lista
            const optionyes = document.createElement('option') // "igen" opció
            optionyes.value = 'igen'
            optionyes.innerText = 'igen'

            const optionno = document.createElement('option') // "nem" opció
            optionno.value = 'nem'
            optionno.innerText = 'nem'

            this.#inputMezo.appendChild(optionyes) // Hozzáadjuk az "igen" opciót
            this.#inputMezo.appendChild(optionno) // Hozzáadjuk a "nem" opciót
        } else {
            this.#inputMezo = document.createElement('input') // Normál input mező
        
            this.#inputMezo.id = id // Beállítjuk az id-t
        }

        this.#hibaElem = document.createElement('span') // Hiba üzenet elem létrehozása
      
        this.#hibaElem.className = 'error' // Hiba üzenet class beállítása


    }

    getDiv(){
        const container = makeDivArea('field') // Létrehozunk egy új div konténert

        const br_elott = document.createElement('br') // Sortörés a label és input közé

        const br_utan = document.createElement('br') // Sortörés az input és hiba üzenet közé


        const elemek = [this.#labelElem, this.#inputMezo, br_elott, this.#hibaElem, br_utan] // Összeállítjuk az elemeket egy tömbbe
        for (const elem of elemek) { // Végigmegyünk az elemek tömbjén
            container.appendChild(elem) // Hozzáadjuk a div konténerhez
        }

        return container // Visszaadjuk a div konténert
    }
    
}