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

// Létrehozunk egy 'form' class nevű divet
const divform = makeDiv('form')

// A divform-ot is hozzáadjuk a containerhez
divcontainer.appendChild(divform)
