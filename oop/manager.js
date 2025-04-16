class Manager { // A Manager osztály az Adat objektumokat kezeli

    // Privát mezők

    /** @type {Adat[]} */
    #array             // A tárolt Adat objektumokat tartalmazó tömb

        /** @type {(adat: Adat) => void} */

    #addAdatCallback   // Callback függvény, amit új adat hozzáadásakor hívunk meg

/**
     * Létrehoz egy új Manager példányt, üres Adat tömbbel.
     */
        constructor() {
        this.#array = []
    }

    // Külső callback beállítása, amit minden új adatnál meghívunk


     /**
     * Beállít egy külső callback függvényt, amit minden új adatnál meghívunk.
     * @param {(adat: Adat) => void} callback - A callback függvény, amely az új Adat példányt kapja meg paraméterként.
     */
    setAddAdatCallback(callback) {
        this.#addAdatCallback = callback
    }

    // Új Adat objektum hozzáadása a tömbhöz

    
    /**
     * Új Adat objektumot ad a tárolt tömbhöz, és meghívja a callbacket.
     * @param {Adat} adat - A hozzáadandó Adat objektum.
     */
    addAdat(adat) {
        this.#array.push(adat)             // Hozzáadjuk az új adatot a listához
        this.#addAdatCallback(adat)        // Meghívjuk a beállított callbacket az új adattal
    }
}
