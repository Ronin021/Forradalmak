// Egy segédfüggvény, ami létrehoz egy <div> elemet a megadott class névvel
const makeDiv = (className) => {
    const div = document.createElement('div') // Létrehozunk egy új <div> elemet
    div.className = className // Beállítjuk a class nevét
    return div // Visszaadjuk az elkészített <div>-et
}

// Létrehozunk egy 'container' class nevű divet
const divcontainer = makeDiv('container')

// Hozzáadjuk a divcontainer-t a dokumentum body-jához
document.body.appendChild(divcontainer)

// Létrehozunk egy 'table' class nevű divet
const divtable = makeDiv('table')

// A divtable-t hozzáadjuk a containeren belülre
divcontainer.appendChild(divtable)
// Létrehozunk egy <table> elemet
const table = document.createElement('table')

// A táblázatot hozzáadjuk a korábban létrehozott 'divtable' elemhez
divtable.appendChild(table)

// Létrehozunk egy <thead> elemet (táblázat fejléce)
const thead = document.createElement('thead')

// A <thead>-et hozzáadjuk a táblázathoz
table.appendChild(thead)

// Létrehozunk egy sort a <thead>-hez
const theadrow = document.createElement('tr')

// A sort hozzáadjuk a <thead>-hez
thead.appendChild(theadrow)

// Oszlopnevek listája
const cella = ['forradalom', 'evszam', 'sikeres']

// Végigmegyünk az oszlopneveken, és létrehozunk hozzájuk egy-egy <th> cellát
for (const cellacontent of cella) {
    const theadcella = document.createElement('th') // Új fejléc cella
    theadcella.innerText = cellacontent // Beállítjuk a cella szövegét

    theadrow.appendChild(theadcella) // Hozzáadjuk a cellát a sorhoz
}

// Létrehozunk egy <tbody> elemet (táblázat törzse)
const tbody = document.createElement('tbody')

// A <tbody>-t hozzáadjuk a táblázathoz
table.appendChild(tbody)




// Létrehozunk egy 'form' class nevű divet
const divform = makeDiv('form')

// A divform-ot is hozzáadjuk a containerhez
divcontainer.appendChild(divform)
