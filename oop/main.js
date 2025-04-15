// Létrehozunk egy <hr>  elemet hogy átláthatóbb legyen
const sep = document.createElement('hr')

// Hozzáadjuk a <hr> elemet a body-hoz
document.body.appendChild(sep)
const manager = new Manager(); // példányosítjuk a Manager osztályt, ami kezeli az adatokat

// Létrehozunk egy új 'table' class nevű divet az Table osztály segítségével
const tableoop = new Table('table', manager)

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

const formoop = new Form('form', fieldsList); // példányosítjuk a Form osztályt, 'form' class-szal



const Fileuploadoop = new Fileupload('fileupload', manager); // példányosítjuk a Fileupload osztályt, ami kezeli a fájlokat