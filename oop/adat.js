class Adat { // Az Adat osztály egy forradalom adatait tárolja

    // Privát mezők az adatok tárolására
    #forradalom   // A forradalom neve
    #evszam       // Az évszám, amikor történt
    #sikeres      // Azt jelzi, hogy sikeres volt-e (igen/nem)

    // Getter: visszaadja a forradalom nevét
    get forradalom() {
        return this.#forradalom
    }

    // Getter: visszaadja az évszámot
    get evszam() {
        return this.#evszam
    }

    // Getter: visszaadja, hogy a forradalom sikeres volt-e
    get sikeres() {
        return this.#sikeres
    }

    // Konstruktor: beállítja a forradalom adatait a példány létrehozásakor
    constructor(forradalom, evszam, sikeres) {
        this.#forradalom = forradalom     // Forradalom nevének beállítása
        this.#evszam = evszam             // Évszám beállítása
        this.#sikeres = sikeres           // Sikeresség beállítása
    }
}
