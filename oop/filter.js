class Filter extends Area {
    /**
     * @param {string} CssClass - CSS osztály.
     * @param {Manager} manager - A Manager példány.
     */
    constructor(CssClass, manager) {
        super(CssClass, manager); // Meghívjuk az Area osztály konstruktorát

        const Filterform = document.createElement('form'); // Létrehozunk egy új form elemet
        this.div.appendChild(Filterform); // Hozzáadjuk a formot a divhez

        const Filterselect = document.createElement('select'); // Létrehozunk egy új select elemet
        Filterform.appendChild(Filterselect); // Hozzáadjuk a selectet a formhoz

        const options = [
            { value: '', innerText: '' },
            { value: 'forradalom', innerText: 'forradalom' },
            { value: 'evszam', innerText: 'evszám' },
            { value: 'sikeres', innerText: 'sikeres' }
        ];

        for (const option of options) { // Végigmegyünk az options tömbön
            const opt = document.createElement('option'); // Létrehozunk egy új option elemet
            opt.value = option.value; // Beállítjuk az option értékét
            opt.innerText = option.innerText; // Beállítjuk az option szövegét
            Filterselect.appendChild(opt); // Hozzáadjuk az optiont a selecthez
        }

        const Filterinput = document.createElement('input'); // Létrehozunk egy új input elemet
        Filterinput.id = 'filterinput'; // Beállítjuk az input id-ját
        Filterform.appendChild(Filterinput); // Hozzáadjuk az inputot a formhoz

        const Filterbutton = document.createElement('button'); // Létrehozunk egy új button elemet
        Filterbutton.innerText = 'szűrés'; // Beállítjuk a button szövegét
        Filterform.appendChild(Filterbutton); // Hozzáadjuk a buttont a formhoz

        const filterDivOOP = document.createElement('div'); // Létrehozunk egy új div elemet
        filterDivOOP.className = 'filterDiv'; // Beállítjuk a div class nevét
        this.div.appendChild(filterDivOOP); // Hozzáadjuk a divet a fő divhez

        Filterform.addEventListener('submit', (e) => { // Hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault(); // Megakadályozzuk az alapértelmezett viselkedést

            const counterOOP = manager.counter(Filterselect.value, Filterinput.value); // Meghívjuk a manager counter függvényét
            filterDivOOP.innerHTML = `A szűrés eredménye: ${counterOOP} találat`; // Megjelenítjük a találatok számát
        });
    }
}