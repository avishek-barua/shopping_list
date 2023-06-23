import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export { inputFieldEl, shoppingListEL };

const appSettings = {
    databaseURL: "https://shopping-cart-b1835-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const shoppingListEL = document.getElementById('shopping-list')

onValue(shoppingListInDb, function (snapshot) {

    if (snapshot.exists()) {


        let itemArray = Object.entries(snapshot.val());

        clearShoppingListEl();

        for (let i = 0; i < itemArray.length; i++) {

            let currentItem = itemArray[i];
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1];

            appendItemToShoppingListEl(currentItem);

        }
    } else {
        shoppingListEL.innerHTML = "No Items Added.. Yet!"
    }
});

addButtonEl.addEventListener("click", function (e) {

    let inputValue = inputFieldEl.value;

    push(shoppingListInDb, inputValue);

    clearInputFieldEl();
})

function clearShoppingListEl() {
    shoppingListEL.innerHTML = '';
}

function appendItemToShoppingListEl(item) {
    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function (e) {
        e.preventDefault();
        let exactShoppingListItem = ref(database, `shoppingList/${itemId}`);
        remove(exactShoppingListItem);
    })

    shoppingListEL.append(newEl);


}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}