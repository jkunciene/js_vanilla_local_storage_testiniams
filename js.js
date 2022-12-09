//ivedimo laukai
const enterID = document.getElementById('enterID');
const enterName = document.getElementById('enterName');
const enterQuantity = document.getElementById('enterQuantity');
//ivedimo laukas, prekes ieskojimui
const findID = document.getElementById('findID');
//vieta rezultatu spausdinimui
const placeForResult = document.getElementById('findData');

//gaunu mygtukus
const insertButton = document.getElementById('insert');
const removeButton = document.getElementById('remove');
const findButton = document.getElementById('find');

// duomenu irasymo funkcija
function insertData(event) {
    event.preventDefault();
    //padaryti validacijas, kad formos uzpildymui

    if (enterID.value.length < 3) {
        alert('Product Code cant be blank! MIN 3 Symbols')
        return
    }
    if (enterName.value === "") {
        alert('Product Name cant be blank!')
        return
    }

    if (enterQuantity.value.length < 1) {
        alert('Product Quantity cant be blank! MIN 1 Symbols')
        return
    }
    //1. patikrinti, ar LS yra prekiu krepselis, jei ne, sukurti []
    const krepselis = JSON.parse(localStorage.getItem("cart")) || [];

    //padaryti tikrinima, ar preke tokiu kodu dar neegzistuoja
    let codes = [];
    for (let i = 0; i < krepselis.length; i++) {
        codes.push(krepselis[i].id);
    }
    if (codes.includes(enterID.value)) {
        alert("Preke tokiu kodu jau yra...");
    } else {
        //2. i krepseli idedu nauja preke
        krepselis.push({
            id: enterID.value,
            name: enterName.value,
            quantity: enterQuantity.value,
        })
    }

    //3. idedu i local storage
    localStorage.setItem('cart', JSON.stringify(krepselis));

    // 4. tikrinu
    console.log(JSON.parse(localStorage.getItem('cart')));
    //5. lauku trynimas, valymas
        enterID.value = "",
        enterName.value = "",
        enterQuantity.value = ""
}
//duomenu gavimo funkcija
function getDataFromLocalStorage(event) {
    event.preventDefault();
    //console.log(JSON.parse(localStorage.getItem('cart')));
    //lauko patikrinimas
    if (findID.value.length < 3) {
        alert('Product Code cant be blank! MIN 3 Symbols')
        return
    }
    //1. gaunu info is LS
    const productsList = JSON.parse(localStorage.getItem('cart'));
    console.log(productsList);
    productsList.map(item => {
        if (item.id === findID.value) {
            console.log(item);
            //1. sukurti list item elementa
            let listItem = document.createElement('li');
            //2. ideti i ji info apie preke
            listItem.textContent = item.name;
            //3. i ul ideti list item
            placeForResult.appendChild(listItem);
        }

    });
    //lauko isvalymas
    findID.value = ''

    //ND -> padaryti, kad gauti duomenys butu atvazduojami  HTML lenteleje
}
//duomenu trynimo funkcija
function deleteDataFromLocalStorage(event) {
    event.preventDefault();
    //lauko patikrinimas 
    if (enterID.value.length < 3) {
        alert('Product Code cant be blank! MIN 3 Symbols')
        return
    }
    //1. gauti prekiu masyva is LS
    const products = JSON.parse(localStorage.getItem('cart'));
    console.log(products);
    //2. randam index ieskomos prekes filter()
    //3. salinam, trinam rasta elementa tuo indeksui
    const naujasMasyvas = products.filter(item =>
        item.id !== enterID.value
    )
    console.log(naujasMasyvas)
    console.log(typeof enterID.value)
    // 4. irasyti nauja info i LS
    localStorage.setItem('cart', JSON.stringify(naujasMasyvas));
    //lauko isvalymas
    enterID.value = ""

    //ND - padaryti, kad istrynus preke is local storage - jos nebelieka ir HTML lenteleje
}

//funkcijos iskvietimas
insertButton.addEventListener('click', insertData);
findButton.addEventListener('click', getDataFromLocalStorage);
removeButton.addEventListener('click', deleteDataFromLocalStorage)
