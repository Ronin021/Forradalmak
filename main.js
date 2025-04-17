const array = [] // létrehozok egy tömböt

// Egy segédfüggvény, ami létrehoz egy <div> elemet a megadott class névvel

/**
 * Létrehoz egy új <div> elemet a megadott osztálynévvel.
 * @param {string} className - A div osztályneve.
 * @returns {HTMLDivElement} - A létrehozott <div> elem.
 */
const makeDiv = (className) => {
    const div = document.createElement('div') // Létrehozunk egy új <div> elemet
    div.className = className // Beállítjuk a class nevét
    return div // Visszaadjuk az elkészített <div>-et
}

    


/**
 * Létrehoz egy szűrő űrlapot, amely lehetővé teszi az adatok szűrését.
 * @param {HTMLDivElement} divcontainer - A szülő div, amelyhez a szűrő űrlapot hozzáadjuk.
 * @param {HTMLTableSectionElement} tbody - A táblázat törzse, amelyet szűrni fogunk.
 * @param {Array} array - Az adatok tömbje, amelyet szűrni fogunk.
 */

const filterFormmaker = (divcontainer, tbody, array) => {
    // Létrehozunk egy új divet a szűrőhöz
    const divfilter = makeDiv('filterDiv'); // Új divet hozunk létre a szűrőnek
    divcontainer.appendChild(divfilter); // A szűrő divet hozzáadjuk a szülő divhez

    // Létrehozunk egy új formot a szűrőhöz
    const filterForm = document.createElement('form'); // Létrehozunk egy form elemet
    divfilter.appendChild(filterForm); // Hozzáadjuk a formot a szűrő divhez

    // Létrehozunk egy lenyíló menüt
    const select = document.createElement('select'); // Létrehozunk egy select elemet
    filterForm.appendChild(select); // Hozzáadjuk a select-et a formhoz

    // Opciók hozzáadása a lenyíló menühöz
    const options = [
        { value: "", innerText: "" }, // Üres érték és szöveg az alapértelmezett lehetőséghez
        { value: 'forradalom', innerText: 'forradalom' }, // Forradalom opció
        { value: 'evszam', innerText: 'evszám' }, // Évszám opció
        { value: 'sikeres', innerText: 'sikeres' } // Sikeres opció
    ];

    // Végigmegyünk az options tömbön és hozzáadjuk az opciókat a select-hez
    for (const option of options) {
        const opt = document.createElement('option'); // Létrehozunk egy új opció elemet
        opt.value = option.value; // Beállítjuk az opció értékét
        opt.innerText = option.innerText; // Beállítjuk az opció szövegét
        select.appendChild(opt); // Hozzáadjuk az opciót a select elemhez
    }

    // Létrehozunk egy input mezőt a szűrési feltétel megadásához
    const input = document.createElement('input'); // Új input mezőt hozunk létre
    input.id = 'filterInput'; // Beállítjuk az input id-ját
    filterForm.appendChild(input); // Hozzáadjuk az inputot a formhoz

    // Létrehozunk egy gombot, amivel a szűrést elindíthatjuk
    const button = document.createElement('button'); // Új gombot hozunk létre
    button.type = 'button'; // Beállítjuk, hogy ne form submit legyen
    button.innerText = 'szűrés'; // Beállítjuk a gomb szövegét
    filterForm.appendChild(button); // Hozzáadjuk a gombot a formhoz

    // Eredmény kiíró div létrehozása
    const resultofdiv = makeDiv('result'); // Létrehozunk egy divet az eredmény kiírásához
    filterForm.appendChild(resultofdiv); // Hozzáadjuk az eredmény divet a formhoz

    // Gombnyomás esemény
    button.addEventListener('click', () => { // Eseménykezelő a gombnyomásra
        const mezo = select.value; // Kiválasztjuk a szűrendő mezőt (select)
        const keresett = input.value.trim().toLowerCase(); // Kivesszük az input mezőben megadott szöveget és kisbetűssé alakítjuk

        let counter = 0; // Kezdő érték a találatok számának
        // Végigmegyünk az adatokat tartalmazó tömbön
        for (const adat of array) {
            const ertek = (adat[mezo] ?? "").toString().toLowerCase(); // Az adott mező értékét lekérjük és kisbetűssé alakítjuk
            if (ertek.includes(keresett)) counter++; // Ha a mező értéke tartalmazza a keresett szöveget, növeljük a találatok számát
        }

        resultofdiv.innerText = `A szűrés eredménye: ${counter} találat`; // Kiírjuk az eredmény div-be a találatok számát
    });
};



/**
 * 
 * @param {HTMLElement} divcontainer - a szülő div, amelyhez a táblázatot hozzáadjuk
 * @param {Function} callback - callback függvény, amit a táblázat létrehozásakor hívunk meg
 */
const createTabla = (divcontainer, callback) => {

    const tablediv = makeDiv('table') // Létrehozunk egy új divet a táblázathoz
    divcontainer.appendChild(tablediv) // Hozzáadjuk a szülő divhez

    const tableSima = document.createElement('table') // Létrehozunk egy új táblázat elemet
    tablediv.appendChild(tableSima) // Hozzáadjuk a táblázat divhez

    const tableHead = document.createElement('thead') // Létrehozunk egy új thead elemet
    tableSima.appendChild(tableHead) // Hozzáadjuk a táblázathoz

    const tableHeadRow = document.createElement('tr') // Létrehozunk egy új sor elemet a thead-hez  
    tableHead.appendChild(tableHeadRow) // Hozzáadjuk a thead-hez

    const theadcellak = ['forradalom', 'evszam', 'sikeres'] // Fejléc cellák tömbje

    for (const cella of theadcellak) { // Végigmegyünk a fejléc cellákon
        const theadcella = document.createElement('th') // Létrehozunk egy új fejléc cellát
        theadcella.innerText = cella // Beállítjuk a cella szövegét
        tableHeadRow.appendChild(theadcella) // Hozzáadjuk a cellát a sorhoz
    }
    const tableBody = document.createElement('tbody') // Létrehozunk egy új tbody elemet
    tableSima.appendChild(tableBody) // Hozzáadjuk a táblázathoz
    callback(tableBody) // Meghívjuk a callback függvényt a tbody-val

    const fajlUploader = (tbody,divcontainer, array) => { // Fájl feltöltő függvény
        const filefeltolto = document.createElement('input') // Fájl feltöltő input létrehozása
        divcontainer.appendChild(filefeltolto) // Hozzáadjuk a containerhez
        filefeltolto.id = 'filefeltolto' // Beállítjuk az id-t
        filefeltolto.type = 'file' // Beállítjuk, hogy fájl típusú legyen

        filefeltolto.addEventListener('change', (e) => { // Eseménykezelő a fájl kiválasztására

            const selectedFile = e.target.files[0] // Az első fájl kiválasztása
            const reader = new FileReader() // Új FileReader létrehozása

            reader.onload = (e) => { // Eseménykezelő a fájl betöltésére
                const filecontent = reader.result.split('\n') // A fájl tartalmának feldolgozása (sorokra bontás)
                const withoutheader = filecontent.slice(1) // Az első sort eltávolítjuk (fejléc)

                for (const line of withoutheader) { // Végigmegyünk a sorokon
                    const uressor = line.trim()// Sorok levágása (felesleges szóközök eltávolítása)
                    const sor = uressor.split(';') // Sorok feldolgozása (pontosvesszővel)
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
                FileReader.readAsText(selectedFile) // Fájl beolvasása szövegként
            })
        const createForm = (divcontainer, tbody, array) => { // Form létrehozó függvény
            const divform = makeDiv('form') // Létrehozunk egy új divet a formhoz
            divcontainer.appendChild(divform) // Hozzáadjuk a szülő divhez

            const form = document.createElement('form') // Létrehozunk egy új form elemet
            divform.appendChild(form) // Hozzáadjuk a formot a szűrő divhez

            const fieldList = [ // Mezők leíró tömb: minden mező egy objektum (id + címke szöveg)
                { fieldid: 'forradalom', fieldLabel: 'forradalom' },
                { fieldid: 'evszam', fieldLabel: 'evszám' },
                { fieldid: 'sikeres', fieldLabel: 'sikeres' }
            ]

            for (const fieldElement of fieldList) { // Végigmegyünk minden mezőn
                const field = makeDiv('field') // Létrehozunk egy új mező konténert
                form.appendChild(field) // Hozzáadjuk a formhoz

                const label = document.createElement('label') // Létrehozunk egy <label>-t
                label.htmlFor = fieldElement.fieldid // Beállítjuk, hogy melyik inputhoz tartozik
                label.textContent = fieldElement.fieldLabel // A címke szövege
                field.appendChild(label) // Címkét hozzáadjuk a mezőhöz

                field.appendChild(document.createElement('br')) // Sortörés a label és input közé

                if (fieldElement.fieldid === 'sikeres') {
                    const input = document.createElement('select') // A "sikeres" mező legyen legördülő
                    input.id = fieldElement.fieldid

                    const optionyes = document.createElement('option') // "igen" opció
                    optionyes.value = 'igen'
                    optionyes.innerText = 'igen'

                    const optionno = document.createElement('option') // "nem" opció
                    optionno.value = 'nem'
                    optionno.innerText = 'nem'

                    input.appendChild(optionyes) // Hozzáadjuk az "igen" opciót
                    input.appendChild(optionno) // Hozzáadjuk a "nem" opciót
                }
                else {
                    const input = document.createElement('input') // Normál input
                    input.id = fieldElement.fieldid
                }
                field.appendChild(input) // Hozzáadjuk az inputot a mezőhöz

                field.appendChild(document.createElement('br')) // Hibaüzenet elem létrehozása
                const error = document.createElement('span') // Hibaüzenet elem létrehozása
                error.className = 'error' // Hibaüzenet class beállítása
                field.appendChild(error) // Hozzáadjuk a mezőhöz
            }

            const FormbuttonSima = document.createElement('button') // Gomb létrehozása és hozzáadása a formhoz
            FormbuttonSima.textContent = 'hozzáadás' // Gomb szövegének beállítása

            form.appendChild(FormbuttonSima) // Hozzáadjuk a gombot a formhoz

            form.addEventListener('submit', (e) => { // Eseménykezelő a form beküldésére
                e.preventDefault() // Megakadályozzuk az alapértelmezett beküldést
                const valueObject = {} // Itt tároljuk az input mezők értékeit

                const inputField = e.target.querySelectorAll('input, select') // Lekérjük az összes input és select mezőt
                let valid = true // Kezdetben érvényesnek tekintjük az űrlapot
                for (const inputFields of inputField) { // Feltöltjük az objektumot a mezők id-jával és értékével
                    const errorfield = inputFields.parentElement.querySelector('.error') // Kiválasztjuk a hibaüzenet mezőt
                    if (!errorfield) { // Ha nincs hibaüzenet mező, akkor létrehozzuk
                        console.error('nincs hibaüzenet mező')
                        return
                    }

                    errorfield.textContent = '' // Üres hibaüzenet
                    if (inputFields.value === '') { // Ha az input mező üres
                        errorfield.textContent = 'Kötelező mező' // Hibaüzenet beállítása
                        valid = false // Érvénytelen űrlap
                    }

                    valueObject[inputFields.id] = inputFields.value // Az objektum feltöltése az input mező értékével
                }

                if(valid){

                    array.push(valueObject) // Hozzáadjuk a tömbhöz

                    sorHozzaadas(tbody, valueObject) // Új sor létrehozása a táblázathoz

                }

            })

            divcontainer.appendChild(divform) // A divform-ot is hozzáadjuk a containerhez
        }


        /**
         * 
         * @param {HTMLElement} tbody - a táblázat törzse 
         * @param {Object} valueObject  - az új sor adatai
         */
        const sorHozzaadas = (tbody, valueObject) => { // Új sor létrehozása a táblázathoz
            const tabelrow = document.createElement('tr') // Új sor létrehozása a táblázathoz
            tbody.appendChild(tabelrow) // Hozzáadjuk a táblázathoz

            const forradalomCella = document.createElement('td') // Forradalom cella létrehozása
            forradalomCella.textContent = valueObject.forradalom // Cella szövegének beállítása
            tabelrow.appendChild(forradalomCella) // Cella hozzáadása a sorhoz

            const evszamCella = document.createElement('td') // Évszám cella létrehozása
            evszamCella.textContent = valueObject.evszam // Cella szövegének beállítása
            tabelrow.appendChild(evszamCella) // Cella hozzáadása a sorhoz

            const sikerCella = document.createElement('td') // Sikeres cella létrehozása
            sikerCella.textContent = valueObject.sikeres // Cella szövegének beállítása
            tabelrow.appendChild(sikerCella) // Cella hozzáadása a sorhoz
        }


        /**
         * 
         * @param {HTMLElement} containerdiv - a szülő div, amelyhez a letöltés gombot hozzáadjuk
         * @param {Array} array - a letöltendő adatok tömbje 
         */
        const fajlLetoltesSima = (containerdiv,array) => { // Fájl letöltés függvény

            const letoltesbutton = document.createElement('button') // Letöltés gomb létrehozása
            letoltesbutton.textContent = 'letöltés' // Gomb szövegének beállítása
            containerdiv.appendChild(letoltesbutton) // Gomb hozzáadása a containerhez

            letoltesbutton.addEventListener('click', () => { // Eseménykezelő a gomb megnyomására

                const link = document.createElement('a') // Új hivatkozás létrehozása

                const letoltesTomb = ['forradalom;evszam;sikeres'] // Letöltési tömb létrehozása
                for (const forradalmak of array) { // Végigmegyünk a tömbön
                    const sor = `${forradalmak.forradalom};${forradalmak.evszam};${forradalmak.sikeres}` // Sor létrehozása
                    letoltesTomb.push(sor) // Sor hozzáadása a letöltési tömbhöz
                }

                const content = letoltesTomb.join('\n') // Tömb összefűzése szöveggé (sorokkal elválasztva)
                const blob = new Blob([content]) // Blob létrehozása a szövegből

                link.href = URL.createObjectURL(blob) // Hivatkozás beállítása a Blob-ra
                link.download = 'newdata.csv' // Letöltési név beállítása
                link.click() // Hivatkozás "megnyomása" (letöltés elindítása)
                URL.revokeObjectURL(link.href) // Blob URL visszavonása
            })
        }
        createTabla(divcontainer, (tableBody) => { // Táblázat létrehozása)

        fajlUploader(tbody, divcontainer, array) // Fájl feltöltő hívása
        createForm(divcontainer, tbody, array) // Form létrehozó hívása
        fajlLetoltesSima(divcontainer, array) // Fájl letöltés hívása
        filterFormmaker(divcontainer, tbody, array) // Szűrő űrlap létrehozása

    })
    }
}