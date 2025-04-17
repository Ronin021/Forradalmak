// Adatok tárolására szolgáló tömb
const array = [];

/**
 * Létrehoz egy új <div> elemet a megadott osztálynévvel.
 * @param {string} className - A div osztályneve.
 * @returns {HTMLDivElement} - A létrehozott <div> elem.
 */
const makeDiv = (className) => {
    const div = document.createElement('div'); // Új <div> elem létrehozása
    div.className = className; // Osztálynév beállítása
    return div; // Visszatér a létrehozott <div> elemmel
};

/**
 * Táblázat létrehozása és a callback függvény meghívása a táblázat törzsével.
 * @param {HTMLElement} divcontainer - A szülő div, amelyhez a táblázatot hozzáadjuk.
 * @param {Function} callback - Callback függvény, amit a táblázat létrehozásakor hívunk meg.
 */
const createTabla = (divcontainer, callback) => {
    const tablediv = makeDiv('table'); // Táblázatot tartalmazó div létrehozása
    divcontainer.appendChild(tablediv); // Hozzáadás a szülő div-hez

    const tableSima = document.createElement('table'); // Táblázat elem létrehozása
    tablediv.appendChild(tableSima); // Táblázat hozzáadása a div-hez

    const tableHead = document.createElement('thead'); // Táblázat fejléc létrehozása
    tableSima.appendChild(tableHead); // Fejléc hozzáadása a táblázathoz

    const tableHeadRow = document.createElement('tr'); // Fejléc sor létrehozása
    tableHead.appendChild(tableHeadRow); // Sor hozzáadása a fejléchez

    // Fejléc cellák létrehozása és hozzáadása
    const theadcellak = ['forradalom', 'evszam', 'sikeres'];
    for (const cella of theadcellak) {
        const theadcella = document.createElement('th'); // Fejléc cella létrehozása
        theadcella.innerText = cella; // Cella szövegének beállítása
        tableHeadRow.appendChild(theadcella); // Cella hozzáadása a sorhoz
    }

    const tableBody = document.createElement('tbody'); // Táblázat törzs létrehozása
    tableSima.appendChild(tableBody); // Törzs hozzáadása a táblázathoz
    callback(tableBody); // Callback függvény meghívása a törzzsel
};

/**
 * Új sor hozzáadása a táblázathoz.
 * @param {HTMLElement} tbody - A táblázat törzse.
 * @param {Object} valueObject - Az új sor adatai.
 */
const sorHozzaadas = (tbody, valueObject) => {
    const tabelrow = document.createElement('tr'); // Új sor létrehozása
    tbody.appendChild(tabelrow); // Sor hozzáadása a táblázat törzséhez

    // Adatok hozzáadása a sorhoz
    for (const key in valueObject) {
        const cell = document.createElement('td'); // Új cella létrehozása
        cell.textContent = valueObject[key]; // Cella tartalmának beállítása
        tabelrow.appendChild(cell); // Cella hozzáadása a sorhoz
    }
};

/**
 * Fájl feltöltő funkció.
 * @param {HTMLElement} tbody - A táblázat törzse.
 * @param {HTMLElement} divcontainer - A szülő div.
 * @param {Array} array - Az adatok tömbje.
 */
const fajlUploader = (tbody, divcontainer, array) => {
    const filefeltolto = document.createElement('input'); // Fájl feltöltő input létrehozása
    filefeltolto.type = 'file'; // Input típusa: fájl
    filefeltolto.id = 'filefeltolto'; // Input azonosítója
    divcontainer.appendChild(filefeltolto); // Input hozzáadása a szülő div-hez

    // Eseménykezelő a fájl feltöltésére
    filefeltolto.addEventListener('change', (e) => {
        const selectedFile = e.target.files[0]; // Kiválasztott fájl
        const reader = new FileReader(); // FileReader példány létrehozása

        reader.onload = () => {
            const filecontent = reader.result.split('\n').slice(1); // Fájl tartalmának feldolgozása (fejléc eltávolítása)
            for (const line of filecontent) {
                const [forradalom, evszam, sikeres] = line.trim().split(';'); // Sor adatainak feldarabolása
                const forradalmak = { forradalom, evszam, sikeres }; // Objektum létrehozása az adatokból
                array.push(forradalmak); // Objektum hozzáadása a tömbhöz
                sorHozzaadas(tbody, forradalmak); // Sor hozzáadása a táblázathoz
            }
        };

        reader.readAsText(selectedFile); // Fájl olvasása szövegként
    });
};

/**
 * Űrlap létrehozása új adatok hozzáadásához.
 * @param {HTMLElement} divcontainer - A szülő div.
 * @param {HTMLElement} tbody - A táblázat törzse.
 * @param {Array} array - Az adatok tömbje.
 */
const createForm = (divcontainer, tbody, array) => {
    const divform = makeDiv('form'); // Űrlapot tartalmazó div létrehozása
    divcontainer.appendChild(divform); // Div hozzáadása a szülő div-hez

    const form = document.createElement('form'); // Űrlap létrehozása
    divform.appendChild(form); // Űrlap hozzáadása a div-hez

    // Mezők listája az űrlaphoz
    const fieldList = [
        { fieldid: 'forradalom', fieldLabel: 'forradalom' },
        { fieldid: 'evszam', fieldLabel: 'evszám' },
        { fieldid: 'sikeres', fieldLabel: 'sikeres' }
    ];

    // Mezők létrehozása és hozzáadása az űrlaphoz
    for (const fieldElement of fieldList) {
        const field = makeDiv('field'); // Mezőt tartalmazó div létrehozása
        form.appendChild(field); // Div hozzáadása az űrlaphoz

        const label = document.createElement('label'); // Címke létrehozása
        label.htmlFor = fieldElement.fieldid; // Címke kapcsolása a mezőhöz
        label.textContent = fieldElement.fieldLabel; // Címke szövegének beállítása
        field.appendChild(label); // Címke hozzáadása a div-hez

        // Input vagy select mező létrehozása
        const input = fieldElement.fieldid === 'sikeres'
            ? (() => {
                const select = document.createElement('select'); // Select mező létrehozása
                ['igen', 'nem'].forEach(value => {
                    const option = document.createElement('option'); // Opció létrehozása
                    option.value = value; // Opció értéke
                    option.innerText = value; // Opció szövege
                    select.appendChild(option); // Opció hozzáadása a select-hez
                });
                return select;
            })()
            : document.createElement('input'); // Input mező létrehozása

        input.id = fieldElement.fieldid; // Input azonosítója
        field.appendChild(input); // Input hozzáadása a div-hez

        const error = document.createElement('span'); // Hibaüzenet helye
        error.className = 'error'; // Hibaüzenet osztálya
        field.appendChild(error); // Hibaüzenet hozzáadása a div-hez
    }

    const submitButton = document.createElement('button'); // Gomb létrehozása
    submitButton.textContent = 'hozzáadás'; // Gomb szövege
    form.appendChild(submitButton); // Gomb hozzáadása az űrlaphoz

    // Eseménykezelő az űrlap beküldésére
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Alapértelmezett viselkedés megakadályozása
        const valueObject = {}; // Új objektum az űrlap adataihoz
        let valid = true; // Validációs állapot

        // Mezők ellenőrzése
        form.querySelectorAll('input, select').forEach(input => {
            const errorfield = input.parentElement.querySelector('.error'); // Hibaüzenet mező
            errorfield.textContent = ''; // Hibaüzenet törlése
            if (!input.value) { // Ha a mező üres
                errorfield.textContent = 'Kötelező mező'; // Hibaüzenet megjelenítése
                valid = false; // Validáció sikertelen
            }
            valueObject[input.id] = input.value; // Mező értékének hozzáadása az objektumhoz
        });

        if (valid) { // Ha minden mező érvényes
            array.push(valueObject); // Objektum hozzáadása a tömbhöz
            sorHozzaadas(tbody, valueObject); // Sor hozzáadása a táblázathoz
        }
    });
};

/**
 * Fájl letöltés funkció.
 * @param {HTMLElement} containerdiv - A szülő div.
 * @param {Array} array - Az adatok tömbje.
 */
const fajlLetoltesSima = (containerdiv, array) => {
    const letoltesbutton = document.createElement('button'); // Letöltés gomb létrehozása
    letoltesbutton.textContent = 'letöltés'; // Gomb szövege
    containerdiv.appendChild(letoltesbutton); // Gomb hozzáadása a szülő div-hez

    // Eseménykezelő a letöltéshez
    letoltesbutton.addEventListener('click', () => {
        const letoltesTomb = ['forradalom;evszam;sikeres', ...array.map(item =>
            `${item.forradalom};${item.evszam};${item.sikeres}`
        )]; // CSV tartalom létrehozása
        const blob = new Blob([letoltesTomb.join('\n')]); // Blob létrehozása
        const link = document.createElement('a'); // Link létrehozása
        link.href = URL.createObjectURL(blob); // Blob URL beállítása
        link.download = 'newdata.csv'; // Fájl neve
        link.click(); // Letöltés indítása
        URL.revokeObjectURL(link.href); // URL felszabadítása
    });
};

/**
 * Szűrő űrlap létrehozása.
 * @param {HTMLElement} divcontainer - A szülő div.
 * @param {HTMLElement} tbody - A táblázat törzse.
 * @param {Array} array - Az adatok tömbje.
 */
const filterFormmaker = (divcontainer, tbody, array) => {
    const divfilter = makeDiv('filterDiv'); // Szűrő div létrehozása
    divcontainer.appendChild(divfilter); // Div hozzáadása a szülő div-hez

    const filterForm = document.createElement('form'); // Szűrő űrlap létrehozása
    divfilter.appendChild(filterForm); // Űrlap hozzáadása a div-hez

    const select = document.createElement('select'); // Select mező létrehozása
    filterForm.appendChild(select); // Select hozzáadása az űrlaphoz

    // Opciók hozzáadása a select-hez
    ['', 'forradalom', 'evszam', 'sikeres'].forEach(value => {
        const option = document.createElement('option'); // Opció létrehozása
        option.value = value; // Opció értéke
        option.innerText = value; // Opció szövege
        select.appendChild(option); // Opció hozzáadása a select-hez
    });

    const input = document.createElement('input'); // Szűrő input mező létrehozása
    input.id = 'filterInput'; // Input azonosítója
    filterForm.appendChild(input); // Input hozzáadása az űrlaphoz

    const button = document.createElement('button'); // Szűrés gomb létrehozása
    button.type = 'button'; // Gomb típusa
    button.innerText = 'szűrés'; // Gomb szövege
    filterForm.appendChild(button); // Gomb hozzáadása az űrlaphoz

    const resultofdiv = makeDiv('result'); // Eredmény div létrehozása
    filterForm.appendChild(resultofdiv); // Div hozzáadása az űrlaphoz

    // Eseménykezelő a szűréshez
    button.addEventListener('click', () => {
        const mezo = select.value; // Kiválasztott mező
        const keresett = input.value.trim().toLowerCase(); // Keresett érték
        const counter = array.filter(adat =>
            (adat[mezo] ?? '').toString().toLowerCase().includes(keresett)
        ).length; // Találatok száma
        resultofdiv.innerText = `A szűrés eredménye: ${counter} találat`; // Eredmény megjelenítése
    });
};

// Alkalmazás inicializálása
const divcontainer = makeDiv('container'); // Fő konténer létrehozása
document.body.appendChild(divcontainer); // Konténer hozzáadása a dokumentumhoz
createTabla(divcontainer, (tableBody) => { // Táblázat létrehozása
    fajlUploader(tableBody, divcontainer, array); // Fájl feltöltő hozzáadása
    createForm(divcontainer, tableBody, array); // Űrlap hozzáadása
    fajlLetoltesSima(divcontainer, array); // Letöltés funkció hozzáadása
    filterFormmaker(divcontainer, tableBody, array); // Szűrő űrlap hozzáadása
});