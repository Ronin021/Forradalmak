/**
 * Segédfüggvény: létrehoz egy új div elemet a megadott osztálynévvel.
 * @param {string} className - Az osztálynév, amit a div-nek adunk.
 * @returns {HTMLDivElement} - A létrehozott div elem.
 */
function createDivWithClass(className) {
    const div = document.createElement('div'); // Létrehozunk egy új div elemet
    div.className = className; // Beállítjuk a div osztálynevét
    return div; // Visszaadjuk a létrehozott div-et
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

        // Mezők létrehozása
        fieldList.forEach(({ fieldid, fieldLabel }) => {
            const field = new FormField(fieldid, fieldLabel);
            this.#fields.push(field);
            form.appendChild(field.getDiv());
        });

        const submitButton = document.createElement('button'); // Gomb létrehozása
        submitButton.textContent = 'hozzáadás';
        form.appendChild(submitButton);

        // Beküldés eseménykezelő
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const valueObject = {};
            let isValid = true;

            this.#fields.forEach((field) => {
                field.error = ''; // Hibaüzenet törlése
                if (!field.value) {
                    field.error = 'Kötelező mező!';
                    isValid = false;
                } else {
                    valueObject[field.id] = field.value;
                }
            });

            if (isValid) {
                const adat = new Adat(
                    valueObject.forradalom,
                    Number(valueObject.evszam),
                    valueObject.sikeres
                );
                this.manager.addAdat(adat);
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

        const fileInput = document.createElement('input'); // Fájl input létrehozása
        fileInput.type = 'file';
        this.div.appendChild(fileInput);

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const rows = reader.result.split('\n').slice(1);
                rows.forEach((row) => {
                    const [forradalom, evszam, sikeres] = row.split(';');
                    const adat = new Adat(forradalom, Number(evszam), sikeres);
                    this.manager.addAdat(adat);
                });
            };

            reader.readAsText(file);
        });

        const downloadButton = document.createElement('button'); // Letöltés gomb
        downloadButton.textContent = 'letöltés';
        this.div.appendChild(downloadButton);

        downloadButton.addEventListener('click', () => {
            const content = this.manager.generateOutputString();
            const blob = new Blob([content]);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'newdataOop.csv';
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }
}

/**
 * A `FormField` osztály egy űrlap mezőt reprezentál.
 */
class FormField {
    /** @type {string} */
    #id;

    /** @type {HTMLInputElement | HTMLSelectElement} */
    #input;

    /** @type {HTMLLabelElement} */
    #label;

    /** @type {HTMLSpanElement} */
    #errorSpan;

    /**
     * Konstruktor: létrehoz egy új `FormField` példányt.
     * @param {string} id - A mező azonosítója.
     * @param {string} labelText - A címke szövege.
     */
    constructor(id, labelText) {
        this.#id = id;

        this.#label = document.createElement('label');
        this.#label.htmlFor = id;
        this.#label.textContent = labelText;

        if (id === 'sikeres') {
            this.#input = document.createElement('select');
            ['igen', 'nem'].forEach((value) => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                this.#input.appendChild(option);
            });
        } else {
            this.#input = document.createElement('input');
            this.#input.id = id;
        }

        this.#errorSpan = document.createElement('span');
        this.#errorSpan.className = 'error';
    }

    /**
     * Getter: visszaadja a mező azonosítóját.
     * @returns {string}
     */
    get id() {
        return this.#id;
    }

    /**
     * Getter: visszaadja a mező értékét.
     * @returns {string}
     */
    get value() {
        return this.#input.value;
    }

    /**
     * Setter: beállítja a hibaüzenetet.
     * @param {string} message - A hibaüzenet.
     */
    set error(message) {
        this.#errorSpan.textContent = message;
    }

    /**
     * Visszaadja az egész mezőt tartalmazó div konténert.
     * @returns {HTMLDivElement}
     */
    getDiv() {
        const container = createDivWithClass('field');
        container.appendChild(this.#label);
        container.appendChild(this.#input);
        container.appendChild(this.#errorSpan);
        return container;
    }
}

