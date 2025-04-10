class Manager { // A Manager osztály az Adat objektumokat kezeli

    // Privát mezők
    #array             // A tárolt Adat objektumokat tartalmazó tömb
    #addAdatCallback   // Callback függvény, amit új adat hozzáadásakor hívunk meg

    // Konstruktor: inicializálja az üres tömböt
    constructor() {
        this.#array = []
    }

    // Külső callback beállítása, amit minden új adatnál meghívunk
    setAddAdatCallback(callback) {
        this.#addAdatCallback = callback
    }

    // Új Adat objektum hozzáadása a tömbhöz
    addAdat(adat) {
        this.#array.push(adat)             // Hozzáadjuk az új adatot a listához
        this.#addAdatCallback(adat)        // Meghívjuk a beállított callbacket az új adattal
    }
}
