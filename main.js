// Adatok tárolására szolgáló tömb
const array = [];

// Fő konténer létrehozása
const divcontainer = document.createElement('div');
divcontainer.className = 'container';
document.body.appendChild(divcontainer);

// Táblázat és funkciók inicializálása
createTabla(divcontainer, (tableBody) => {
    fajlUploader(tableBody, divcontainer, array); // Fájl feltöltő hozzáadása
    createForm(divcontainer, tableBody, array); // Űrlap hozzáadása
    fajlLetoltesSima(divcontainer, array); // Letöltés funkció hozzáadása
    filterFormmaker(divcontainer, tableBody, array); // Szűrő űrlap hozzáadása
});