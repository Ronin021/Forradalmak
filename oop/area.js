// Area osztály: egy div-et hoz létre, amit hozzáad egy közös 'oopcontainer'-hez
class Area {

    #div // Privát mező: ide kerül a létrehozott div elem

    // Getter: kívülről elérhetővé teszi a privát div-et
    get div(){
        return this.#div
    }

    constructor(className) {
        // Megpróbáljuk kiválasztani a már létező '.oopcontainer' elemet
        let divcontainer = document.querySelector('.oopcontainer')

        // Ha nem létezik ilyen elem, akkor létrehozzuk
        if (!divcontainer) {
            divcontainer = document.createElement('div') // Új <div> létrehozása
            divcontainer.className = 'oopcontainer' // Beállítjuk a class nevét

            document.body.appendChild(divcontainer) // Hozzáadjuk a body-hoz
        }

        this.#div = document.createElement('div') // Létrehozunk egy új div elemet

        this.#div.className = className // Beállítjuk a kapott class nevet

        divcontainer.appendChild(this.#div) // Hozzáadjuk az oopcontainerhez
    }
}

// Table osztály: örökli az Area-t, és létrehoz benne egy táblázatot fejléccel és tbody-val
class Table extends Area {

    constructor(cssClass){
        super(cssClass) // Meghívjuk az Area konstruktorát, létrehozva a divet és hozzáadva a containerhez

        const table = document.createElement('table') // Létrehozunk egy <table> elemet

        this.div.appendChild(table) // A táblázatot hozzáadjuk az örökölt divhez

        const thead = document.createElement('thead') // Létrehozzuk a táblázat fejlécrészét

        table.appendChild(thead) // A <thead>-et hozzáadjuk a táblázathoz

        const theadrow = document.createElement('tr') // Létrehozunk egy sort a fejlécbe

        thead.appendChild(theadrow) // A sort hozzáadjuk a <thead>-hez

        // Oszlopnevek listája
        const cella = ['forradalom', 'evszam', 'sikeres']

        // Végigmegyünk az oszlopneveken, és létrehozunk hozzájuk egy-egy <th> cellát
        for (const cellacontent of cella) {
            const theadcella = document.createElement('th') // Új fejléc cella
            theadcella.innerText = cellacontent // Beállítjuk a cella szövegét

            theadrow.appendChild(theadcella) // Hozzáadjuk a cellát a sorhoz
        }

        const tbody = document.createElement('tbody') // Létrehozzuk a táblázat törzsrészét

        table.appendChild(tbody) // Hozzáadjuk a <tbody>-t a táblázathoz
    }
}
