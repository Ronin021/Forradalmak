class Manager { 
    // A Manager osztály az Adat objektumokat kezeli

    // Privát mezők

    /** @type {Adat[]} */
    #array; // A tárolt Adat objektumokat tartalmazó tömb

    /** @type {(adat: Adat) => void} */
    #addAdatCallback; // Callback függvény, amit új adat hozzáadásakor hívunk meg

    /** @type {(adatok: Adat[]) => void} */
    #RenderOOP; // Callback függvény, amit a szűrt adatok renderelésére használunk

    /**
     * Létrehoz egy új Manager példányt, üres Adat tömbbel.
     */
    constructor() {
        this.#array = []; // Inicializáljuk az üres tömböt az Adat objektumok tárolására
    }

    /**
     * Beállít egy külső callback függvényt, amit minden új adatnál meghívunk.
     * @param {(adat: Adat) => void} callback - A callback függvény, amely az új Adat példányt kapja meg paraméterként.
     */
    setAddAdatCallback(callback) {
        this.#addAdatCallback = callback; // Beállítjuk a callback függvényt
    }

    /**
     * Új Adat objektumot ad a tárolt tömbhöz, és meghívja a callbacket.
     * @param {Adat} adat - A hozzáadandó Adat objektum.
     */
    addAdat(adat) {
        this.#array.push(adat); // Hozzáadjuk az új adatot a listához
        if (this.#addAdatCallback) {
            this.#addAdatCallback(adat); // Meghívjuk a beállított callbacket az új adattal
        }
    }

    /**
     * Beállítja a renderelő callback függvényt.
     * @param {(adatok: Adat[]) => void} callback - A callback függvény, amely a renderelési logikát határozza meg.
     */
    setRenderOOP(callback) {
        this.#RenderOOP = callback; // Beállítja a renderelő függvényt
    }

    /**
     * Szűrjük a tárolt Adat objektumokat a megadott callback függvény alapján.
     * @param {(adat: Adat) => boolean} callback - A callback függvény, amely a szűrési feltételt határozza meg.
     * A callback függvény egy `Adat` objektumot kap paraméterként, és egy logikai értéket ad vissza.
     */
    filterOOP(callback) {
        const filteredArray = []; // Szűrt Adat objektumokat tartalmazó tömb
        for (let i = 0; i < this.#array.length; i++) { // Végigmegyünk az összes Adat objektumon
            const adat = this.#array[i]; // Az aktuális Adat objektum
            if (callback(adat)) { // Ha a callback függvény igazat ad vissza
                filteredArray.push(adat); // Hozzáadjuk a szűrt tömbhöz
            }
        }
        if (this.#RenderOOP) {
            this.#RenderOOP(filteredArray); // Meghívjuk a renderelő függvényt a szűrt tömbbel
        }
    }

    /**
     * Számolja a találatokat a megadott mező és keresési érték alapján.
     * @param {string} field - A mező neve, amely alapján szűrünk.
     * @param {string} value - A keresett érték.
     * @returns {number} - A találatok száma.
     */
    counter(field, value) {
        const keresett = value.trim().toLowerCase(); // Keresett érték kisbetűsítve
        let count = 0; // Találatok száma
        for (let i = 0; i < this.#array.length; i++) { // Végigmegyünk az összes Adat objektumon
            const adat = this.#array[i]; // Az aktuális Adat objektum
            const fieldValue = adat[field]?.toString().toLowerCase() ?? ''; // Mező értéke kisbetűsítve
            if (fieldValue.includes(keresett)) { // Ellenőrizzük, hogy tartalmazza-e a keresett értéket
                count++; // Növeljük a találatok számát
            }
        }
        return count; // Visszaadjuk a találatok számát
    }
}
