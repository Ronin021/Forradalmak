class Area {
    constructor(className) {
        // Megpróbáljuk kiválasztani a már létező '.oopcontainer' elemet
        let divcontainer = document.querySelector('.oopcontainer')

        // Ha nem létezik ilyen elem, akkor létrehozzuk
        if (!divcontainer) {
            divcontainer = document.createElement('div') // Új <div> létrehozása
            divcontainer.className = 'oopcontainer' // Beállítjuk a class nevét

            document.body.appendChild(divcontainer) // Hozzáadjuk a body-hoz
        }

        const div = document.createElement('div') // Létrehozunk egy új <div>-et
        div.className = className // Beállítjuk a megadott class nevet

        divcontainer.appendChild(div) // Hozzáadjuk az új divet a containerhez
    }
}
