// Létrehozunk egy <hr>  elemet hogy átláthatóbb legyen
const sep = document.createElement('hr')

// Hozzáadjuk a <hr> elemet a body-hoz
document.body.appendChild(sep)

// Létrehozunk egy új 'table' class nevű divet az Table osztály segítségével
const table = new Table('table')

const fieldsList = [{ // egy tömb objektumokkal
    fieldid: 'forradalom', // ez lesz az input id-ja
    fieldLabel: 'forradalom' // labelszöveg
},
{
    fieldid: 'evszam', // második mező id
    fieldLabel: 'evszám' // második mező felirat
},
{
    fieldid: 'sikeres', // harmadik mező id
    fieldLabel: 'sikeres' // harmadik mező felirat
}];

const form = new Form('form', fieldsList); // példányosítjuk a Form osztályt, 'form' class-szal