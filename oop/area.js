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






class Form extends Area { 
    constructor(cssClass){ 
        super(cssClass); // Meghívjuk az Area konstruktorát, létrehozva a divet

        const form = document.createElement('form'); // Létrehozunk egy <form> elemet
        this.div.appendChild(form); // A formot hozzáadjuk az örökölt divhez

        const fieldList = [{ // Mezők leírása objektumok tömbjében
            fieldid: 'forradalom', 
            fieldLabel: 'forradalom'
        },
        {
            fieldid: 'evszam', 
            fieldLabel: 'evszám' 
        },
        {
            fieldid: 'sikeres', 
            fieldLabel: 'sikeres' 
        }];
        
        for(const fieldElement of fieldList){ 
            const field = makeDiv('field'); // Létrehozunk egy új mező-tartó divet
            form.appendChild(field); // Hozzáadjuk a formhoz
        
            const label = document.createElement('label'); // Címke létrehozása
            label.htmlFor = fieldElement.fieldid; // Összekötjük az inputtal
            label.textContent = fieldElement.fieldLabel; // Beállítjuk a címkét
            field.appendChild(label); 
        
            let input = document.createElement('input'); // Input létrehozása
            input.id = fieldElement.fieldid; // Beállítjuk az id-t
            field.appendChild(document.createElement('br')); // Sortörés
        
            if(fieldElement.fieldid === 'sikeres') { 
                input = document.createElement('select'); // Legördülő lista
                input.id = fieldElement.fieldid; 
        
                const optionyes = document.createElement('option'); // "igen" opció
                optionyes.value = 'igen';
                optionyes.innerText = 'igen';
        
                const optionno = document.createElement('option'); // "nem" opció
                optionno.value = 'nem';
                optionno.innerText = 'nem';
        
                input.appendChild(optionyes); // Hozzáadjuk az opciókat
                input.appendChild(optionno);
            }
            else{ 
                input = document.createElement('input'); // Szövegmező
                input.id = fieldElement.fieldid; 
            }

            field.appendChild(input); // Hozzáadjuk a mezőt a field divhez
        }
        
        const button = document.createElement('button') // Gomb létrehozása
        button.textContent = 'hozzáadás'; // Gomb felirata
        form.appendChild(button); // Hozzáadjuk a formhoz
    }
}

