class Adat { // Az Adat osztály egy forradalom adatait tárolja

    // Privát mezők az adatok tárolására

        /** @type {string} */

    #forradalom   // A forradalom neve


        /** @type {number} */

    #evszam       // Az évszám, amikor történt

        /** @type {string} */

    #sikeres      // Azt jelzi, hogy sikeres volt-e (igen/nem)

    // Getter: visszaadja a forradalom nevét

   /**
    *   * @returns {string} A forradalom neve.
*/
    get forradalom() {
        return this.#forradalom
    }

    // Getter: visszaadja az évszámot

    /** 
     * @returns {number} A forradalom évszáma.
     */
    get evszam() {
        return this.#evszam
    }

    // Getter: visszaadja, hogy a forradalom sikeres volt-e

     /** 
     * @returns {string} Azt jelzi, hogy sikeres volt-e a forradalom.
     */
    get sikeres() {
        return this.#sikeres
    }


      /**
     * Létrehoz egy új Adat példányt a megadott adatokkal.
     * @param {string} forradalom - A forradalom neve.
     * @param {number} evszam - A forradalom évszáma.
     * @param {string} sikeres - Azt jelzi, hogy sikeres volt-e ("igen" vagy "nem").
     */
    // Konstruktor: beállítja a forradalom adatait a példány létrehozásakor
    constructor(forradalom, evszam, sikeres) {
        this.#forradalom = forradalom     // Forradalom nevének beállítása
        this.#evszam = evszam             // Évszám beállítása
        this.#sikeres = sikeres           // Sikeresség beállítása
    }
}
