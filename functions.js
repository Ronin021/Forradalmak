/**
 * Létrehoz egy új div elemet a megadott osztálynévvel.
 * @param {string} className - Az osztálynév, amit a div-nek adunk.
 * @returns {HTMLDivElement} - A létrehozott div elem.
 */
const makeDiv = (className) => {
    const div = document.createElement('div'); // Új <div> elem létrehozása
    div.className = className; // Osztálynév beállítása
    return div; // Visszatér a létrehozott <div> elemmel
};

/**
 * Táblázatot hoz létre a megadott konténerben, és meghív egy callback függvényt a táblázat törzsével.
 * @param {HTMLElement} divcontainer - A szülő div, amelyhez a táblázatot hozzáadjuk.
 * @param {function (HTMLElement):void} callback - A callback függvény, amely a táblázat törzsét kapja meg paraméterként.
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
 * Új sort ad hozzá a táblázat törzséhez a megadott adatok alapján.
 * @param {HTMLElement} tbody - A táblázat törzse, amelyhez a sort hozzáadjuk.
 * @param {Forradalom} valueObject - Az új sor adatai itt jelennek meg.
 */
const sorHozzaadas = (tbody, valueObject) => {
    const tabelrow = document.createElement('tr'); // Új sor létrehozása
    tbody.appendChild(tabelrow); // Sor hozzáadása a táblázat törzséhez

    for (const key in valueObject) {
        const cell = document.createElement('td'); // Új cella létrehozása
        cell.textContent = valueObject[key]; // Cella tartalmának beállítása
        tabelrow.appendChild(cell); // Cella hozzáadása a sorhoz
    }
};

/**
 * Fájl feltöltési funkciót biztosít, amely a fájl tartalmát hozzáadja a táblázathoz és a tömbhöz.
 * @param {HTMLElement} tbody - A táblázat törzse, amelyhez a sorokat hozzáadjuk.
 * @param {HTMLElement} divcontainer - A szülő div, amelyhez a fájl feltöltő inputot hozzáadjuk.
 * @param {array[]} array - Az adatok tömbje, amelyhez a fájl tartalmát hozzáadjuk.
 */
const fajlUploader = (tbody, divcontainer, array) => {
    const filefeltolto = document.createElement('input'); // Fájl feltöltő input létrehozása
    filefeltolto.type = 'file'; // Input típusa: fájl
    filefeltolto.id = 'filefeltolto'; // Input azonosítója
    divcontainer.appendChild(filefeltolto); // Input hozzáadása a szülő div-hez

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
 * Űrlapot hoz létre új adatok hozzáadásához.
 * @param {HTMLElement} divcontainer - A szülő div, amelyhez az űrlapot hozzáadjuk.
 * @param {HTMLElement} tbody - A táblázat törzse, amelyhez a sorokat hozzáadjuk.
 * @param {array[]} array - Az adatok tömbje, amelyhez az új adatokat hozzáadjuk.
 */
const createForm = (divcontainer, tbody, array) => {
    const divform = makeDiv('form'); // Űrlapot tartalmazó div létrehozása
    divcontainer.appendChild(divform); // Div hozzáadása a szülő div-hez

    const form = document.createElement('form'); // Űrlap létrehozása
    divform.appendChild(form); // Űrlap hozzáadása a div-hez

    const fieldList = [
        { fieldid: 'forradalom', fieldLabel: 'forradalom' },
        { fieldid: 'evszam', fieldLabel: 'evszám' },
        { fieldid: 'sikeres', fieldLabel: 'sikeres' }
    ];

    for (const fieldElement of fieldList) {
        const field = makeDiv('field'); // Mezőt tartalmazó div létrehozása
        form.appendChild(field); // Div hozzáadása az űrlaphoz

        const label = document.createElement('label'); // Címke létrehozása
        label.htmlFor = fieldElement.fieldid; // Címke kapcsolása a mezőhöz
        label.textContent = fieldElement.fieldLabel; // Címke szövegének beállítása
        field.appendChild(label); // Címke hozzáadása a div-hez

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

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Alapértelmezett viselkedés megakadályozása
        const valueObject = {}; // Új objektum az űrlap adataihoz
        let valid = true; // Validációs állapot

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
 * 
 * @param {HTMLElement} containerdiv - A szülő div, amelyhez a letöltés gombot hozzáadjuk. 
 * @param {{forradalom:String, evszam:string, sikeres:string}[]} array 
 */
const fajlLetoltesSima = (containerdiv, array) => {
    const letoltesbutton = document.createElement('button'); // Letöltés gomb létrehozása
    letoltesbutton.textContent = 'letöltés'; // Gomb szövege
    containerdiv.appendChild(letoltesbutton); // Gomb hozzáadása a szülő div-hez

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
 * 
 * @param {HTMLElement} divcontainer - A szülő div, amelyhez a szűrő elemeket hozzáadjuk.
 * @param {HTMLElement} tbody - A táblázat törzse, amelyhez a szűrő eredményét hozzáadjuk.
 * @param {array[]} array - Az adatok tömbje, amelyet a táblázatban megjelenítünk.
 */
const filterFormmaker = (divcontainer, tbody, array) => {
    const divfilter = makeDiv('filterDiv'); // Szűrő div létrehozása
    divcontainer.appendChild(divfilter); // Div hozzáadása a szülő div-hez

    const filterForm = document.createElement('form'); // Szűrő űrlap létrehozása
    divfilter.appendChild(filterForm); // Űrlap hozzáadása a div-hez

    const select = document.createElement('select'); // Select mező létrehozása
    filterForm.appendChild(select); // Select hozzáadása az űrlaphoz

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

    button.addEventListener('click', () => {
        const mezo = select.value; // Kiválasztott mező
        const keresett = input.value.trim().toLowerCase(); // Keresett érték
        const counter = array.filter(adat =>
            (adat[mezo] ?? '').toString().toLowerCase().includes(keresett)
        ).length; // Találatok száma
        resultofdiv.innerText = `A szűrés eredménye: ${counter} találat`; // Eredmény megjelenítése
    });
};