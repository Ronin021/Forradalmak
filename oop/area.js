/**
 * Segédfüggvény: létrehoz egy új div elemet a megadott osztálynévvel.
 * @param {string} className - Az osztálynév, amit a div-nek adunk.
 * @returns {HTMLDivElement} - A létrehozott div elem.
 */
function createDivWithClass(className) {
    const div = document.createElement('div'); // Létrehozunk egy új <div> elemet
    div.className = className; // Beállítjuk a div osztálynevét a megadott paraméter alapján
    return div; // Visszaadjuk a létrehozott div elemet
}

/**
 * Az `Area` osztály egy alapvető építőelem, amely egy div-et hoz létre, és hozzáadja egy közös konténerhez.
 */
class Area {
    /** @type {HTMLDivElement} */
    #div; // Privát mező: a létrehozott div elem

    /** @type {Manager} */
    #manager; // Privát mező: a Manager példány

    /**
     * Konstruktor: létrehoz egy új `Area` példányt.
     * @param {string} className - Az osztálynév a div számára.
     * @param {Manager} manager - A kezelő példány.
     */
    constructor(className, manager) {
        this.#manager = manager; // Beállítjuk a Manager példányt
        const container = Area.#getOrCreateContainer(); // Lekérjük vagy létrehozzuk a közös konténert

        this.#div = createDivWithClass(className); // Létrehozzuk a div-et a megadott osztálynévvel
        container.appendChild(this.#div); // Hozzáadjuk a div-et a közös konténerhez
    }

    /**
     * Getter: visszaadja a Manager példányt.
     * @returns {Manager} - A Manager példány.
     */
    get manager() {
        return this.#manager; // Visszaadjuk a Manager példányt
    }

    /**
     * Getter: visszaadja a privát div-et.
     * @returns {HTMLDivElement} - A div elem.
     */
    get div() {
        return this.#div; // Visszaadjuk a privát div-et
    }

    /**
     * Privát statikus metódus: visszaadja a közös konténer div-et, vagy létrehozza, ha nem létezik.
     * @returns {HTMLDivElement} - A közös konténer div.
     */
    static #getOrCreateContainer() {
        let container = document.querySelector('.oopcontainer'); // Megkeressük a közös konténert a DOM-ban
        if (!container) { // Ha nem található
            container = createDivWithClass('oopcontainer'); // Létrehozzuk a közös konténert
            document.body.appendChild(container); // Hozzáadjuk a body-hoz
        }
        return container; // Visszaadjuk a közös konténert
    }
}

/**
 * A `Table` osztály egy táblázatot hoz létre az `Area` osztályon belül.
 */
class Table extends Area {
    /**
     * Konstruktor: létrehoz egy új `Table` példányt.
     * @param {string} cssClass - CSS osztály a div számára.
     * @param {Manager} manager - A kezelő példány.
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívjuk az Area konstruktorát
        const tableBody = this.#createTable(); // Létrehozzuk a táblázatot

        // Callback beállítása, amit új adat hozzáadásakor hívunk meg
        this.manager.setAddAdatCallback((adat) => {
            const row = document.createElement('tr'); // Új sor létrehozása
            tableBody.appendChild(row); // Hozzáadjuk a tbody-hoz

            // Cellák létrehozása és hozzáadása a sorhoz
            ['forradalom', 'evszam', 'sikeres'].forEach((key) => {
                const cell = document.createElement('td'); // Új cella létrehozása
                cell.textContent = adat[key]; // Beállítjuk a cella tartalmát
                row.appendChild(cell); // Hozzáadjuk a cellát a sorhoz
            });
        });
    }

    /**
     * Privát metódus: létrehozza a táblázatot fejléccel és tbody-val.
     * @returns {HTMLTableSectionElement} - A létrehozott tbody.
     */
    #createTable() {
        const table = document.createElement('table'); // Táblázat létrehozása
        this.div.appendChild(table); // Hozzáadjuk a div-hez

        const thead = document.createElement('thead'); // Fejléc rész
        table.appendChild(thead); // Hozzáadjuk a táblázathoz

        const theadRow = document.createElement('tr'); // Fejléc sor
        thead.appendChild(theadRow); // Hozzáadjuk a fejléc részhez

        // Fejléc cellák létrehozása
        ['forradalom', 'evszam', 'sikeres'].forEach((header) => {
            const th = document.createElement('th'); // Fejléc cella létrehozása
            th.textContent = header; // Beállítjuk a cella tartalmát
            theadRow.appendChild(th); // Hozzáadjuk a cellát a fejléc sorhoz
        });

        const tbody = document.createElement('tbody'); // Táblázat törzse
        table.appendChild(tbody); // Hozzáadjuk a táblázathoz

        return tbody; // Visszaadjuk a törzset
    }
}

/**
 * A `Form` osztály egy űrlapot hoz létre az `Area` osztályon belül.
 */
class Form extends Area {
    /** @type {FormField[]} */
    #fields; // Privát mező: az űrlap mezői

    /**
     * Konstruktor: létrehoz egy új `Form` példányt.
     * @param {string} cssClass - CSS osztály a div számára.
     * @param {{fieldid: string, fieldLabel: string}[]} fieldList - Mezők listája.
     * @param {Manager} manager - A kezelő példány.
     */
    constructor(cssClass, fieldList, manager) {
        super(cssClass, manager); // Meghívjuk az Area konstruktorát
        this.#fields = []; // Inicializáljuk a mezők tömbjét

        const form = document.createElement('form'); // Űrlap létrehozása
        this.div.appendChild(form); // Hozzáadjuk a div-hez

        // Mezők létrehozása a fieldList alapján
        fieldList.forEach(({ fieldid, fieldLabel }) => {
            // Létrehozunk egy új FormField példányt a mező azonosítójával és címkéjével
            const field = new FormField(fieldid, fieldLabel);

            // Hozzáadjuk a mezőt a privát mezők tömbjéhez
            this.#fields.push(field);

            // Hozzáadjuk a mezőt a formhoz
            form.appendChild(field.getDiv());
        });

        // Gomb létrehozása az űrlap beküldéséhez
        const submitButton = document.createElement('button'); // Létrehozunk egy <button> elemet
        submitButton.textContent = 'hozzáadás'; // Beállítjuk a gomb szövegét
        form.appendChild(submitButton); // Hozzáadjuk a gombot az űrlaphoz

        // Beküldés eseménykezelő hozzáadása az űrlaphoz
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozzuk az alapértelmezett beküldési viselkedést (pl. az oldal újratöltését)
            const valueObject = {}; // Létrehozunk egy objektumot az űrlap mezőinek értékeinek tárolására
            let isValid = true; // Inicializáljuk az érvényességi állapotot

            // Végigmegyünk az összes mezőn, és ellenőrizzük az értéküket
            this.#fields.forEach((field) => {
                field.error = ''; // Töröljük az esetleges korábbi hibaüzeneteket
                if (!field.value) { // Ha a mező értéke üres
                    field.error = 'Kötelező mező!'; // Beállítjuk a hibaüzenetet
                    isValid = false; // Az űrlap nem érvényes
                } else {
                    valueObject[field.id] = field.value; // Hozzáadjuk a mező értékét az objektumhoz
                }
            });

            // Ha az űrlap érvényes, létrehozunk egy új Adat objektumot
            if (isValid) {
                const adat = new Adat(
                    valueObject.forradalom, // A forradalom neve
                    Number(valueObject.evszam), // Az évszám (számmá alakítva)
                    valueObject.sikeres // A sikeresség értéke
                );
                this.manager.addAdat(adat); // Hozzáadjuk az új Adat objektumot a Manager példányhoz
            }
        });
    }
}

/**
 * A `Fileupload` osztály fájl feltöltési funkciót biztosít az `Area` osztályon belül.
 */
class Fileupload extends Area {
    /**
     * Konstruktor: létrehoz egy új `Fileupload` példányt.
     * @param {string} cssClass - CSS osztály.
     * @param {Manager} manager - Kezelő példány.
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívjuk az Area konstruktorát

        // Fájl input létrehozása
        const fileInput = document.createElement('input'); // Létrehozunk egy <input> elemet
        fileInput.type = 'file'; // Beállítjuk az input típusát fájl feltöltésre
        this.div.appendChild(fileInput); // Hozzáadjuk az inputot a div-hez

        // Eseménykezelő a fájl kiválasztásához
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0]; // Lekérjük a kiválasztott fájlt
            const reader = new FileReader(); // Létrehozunk egy FileReader példányt a fájl olvasásához

            // Fájl betöltésekor végrehajtandó műveletek
            reader.onload = () => {
                const rows = reader.result.split('\n').slice(1); // A fájl tartalmát sorokra bontjuk, és kihagyjuk az első sort (fejléc)
                rows.forEach((row) => {
                    const [forradalom, evszam, sikeres] = row.split(';'); // A sort mezőkre bontjuk pontosvessző alapján
                    const adat = new Adat(forradalom, Number(evszam), sikeres); // Létrehozunk egy új Adat objektumot
                    this.manager.addAdat(adat); // Hozzáadjuk az Adat objektumot a Manager példányhoz
                });
            };

            reader.readAsText(file); // A fájlt szövegként olvassuk be
        });

        // Letöltés gomb létrehozása
        const downloadButton = document.createElement('button'); // Létrehozunk egy <button> elemet
        downloadButton.textContent = 'letöltés'; // Beállítjuk a gomb szövegét
        this.div.appendChild(downloadButton); // Hozzáadjuk a gombot a div-hez

        // Eseménykezelő a letöltés gombhoz
        downloadButton.addEventListener('click', () => {
            const content = this.manager.generateOutputString(); // Lekérjük a Manager által generált tartalmat
            const blob = new Blob([content]); // Létrehozunk egy Blob objektumot a tartalommal
            const link = document.createElement('a'); // Létrehozunk egy <a> elemet
            link.href = URL.createObjectURL(blob); // Beállítjuk a letöltési URL-t
            link.download = 'newdataOop.csv'; // Beállítjuk a letöltendő fájl nevét
            link.click(); // Kattintást szimulálunk a letöltés elindításához
            URL.revokeObjectURL(link.href); // Felszabadítjuk az URL-t
        });
    }
}

/**
 * A `FormField` osztály egy űrlap mezőt reprezentál.
 */
class FormField {
    /** @type {string} */
    #id; // Privát mező: a mező azonosítója

    /** @type {HTMLInputElement | HTMLSelectElement} */
    #input; // Privát mező: az input vagy select elem

    /** @type {HTMLLabelElement} */
    #label; // Privát mező: a mező címkéje

    /** @type {HTMLSpanElement} */
    #errorSpan; // Privát mező: a hibaüzenet megjelenítésére szolgáló span elem

    /**
     * Konstruktor: létrehoz egy új `FormField` példányt.
     * @param {string} id - A mező azonosítója.
     * @param {string} labelText - A címke szövege.
     */
    constructor(id, labelText) {
        this.#id = id; // Beállítjuk a mező azonosítóját

        this.#label = document.createElement('label'); // Létrehozunk egy <label> elemet
        this.#label.htmlFor = id; // Beállítjuk a címke `for` attribútumát az azonosítóra
        this.#label.textContent = labelText; // Beállítjuk a címke szövegét

        if (id === 'sikeres') { // Ha a mező azonosítója 'sikeres'
            this.#input = document.createElement('select'); // Létrehozunk egy <select> elemet
            ['igen', 'nem'].forEach((value) => { // Hozzáadjuk az opciókat a select elemhez
                const option = document.createElement('option'); // Létrehozunk egy <option> elemet
                option.value = value; // Beállítjuk az opció értékét
                option.textContent = value; // Beállítjuk az opció szövegét
                this.#input.appendChild(option); // Hozzáadjuk az opciót a select elemhez
            });
        } else { // Ha a mező nem 'sikeres'
            this.#input = document.createElement('input'); // Létrehozunk egy <input> elemet
            this.#input.id = id; // Beállítjuk az input azonosítóját
        }

        this.#errorSpan = document.createElement('span'); // Létrehozunk egy <span> elemet a hibaüzenethez
        this.#errorSpan.className = 'error'; // Beállítjuk a span osztálynevét 'error'-ra
    }

    /**
     * Getter: visszaadja a mező azonosítóját.
     * @returns {string}
     */
    get id() {
        return this.#id; // Visszaadjuk a mező azonosítóját
    }

    /**
     * Getter: visszaadja a mező értékét.
     * @returns {string}
     */
    get value() {
        return this.#input.value; // Visszaadjuk az input vagy select elem értékét
    }

    /**
     * Setter: beállítja a hibaüzenetet.
     * @param {string} message - A hibaüzenet.
     */
    set error(message) {
        this.#errorSpan.textContent = message; // Beállítjuk a hibaüzenet szövegét
    }

    /**
     * Visszaadja az egész mezőt tartalmazó div konténert.
     * @returns {HTMLDivElement}
     */
    getDiv() {
        const container = createDivWithClass('field'); // Létrehozunk egy div elemet a mező számára
        container.appendChild(this.#label); // Hozzáadjuk a címkét a div-hez
        container.appendChild(this.#input); // Hozzáadjuk az input vagy select elemet a div-hez
        container.appendChild(this.#errorSpan); // Hozzáadjuk a hibaüzenet span elemet a div-hez
        return container; // Visszaadjuk a mezőt tartalmazó div-et
    }
}

