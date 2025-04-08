import { getAllItems, addItem } from "./domain.js";

const addAllEventListeners = () => {
    const addItemIconButtonElement = document.getElementById("add-item-icon");
    addItemIconButtonElement.addEventListener("click", (e) => {
        e.preventDefault();
        
        //locks background
        const bodyElement = document.getElementById("body");
        bodyElement.style = "overflow-y: hidden;";
        //hide icon
        addItemIconButtonElement.classList.add("hidden");
        //display popup
        const popupElement = document.getElementById("add-item");
        popupElement.classList.remove("popup-hidden");
    });

    const formElement = document.getElementById("form");
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        //add item
        const nameInputElement = document.getElementById("name")
        const quantityInputElement = document.getElementById("quantity")
        const unitsInputElement = document.getElementById("units")
        const newItem = {
            name: nameInputElement.value,
            quantity: quantityInputElement.value,
            unit: unitsInputElement.value
        }
        addItem(newItem);
        //unlocks background
        const bodyElement = document.getElementById("body");
        bodyElement.style = "overflow-y: auto;";
        //removes popup
        const popupElement = document.getElementById("add-item");
        popupElement.classList.add("popup-hidden");
        //show icon
        addItemIconButtonElement.classList.remove("hidden");
    });

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();

        //unlocks background
        const bodyElement = document.getElementById("body");
        bodyElement.style = "overflow-y: auto;";
        //removes popup
        const popupElement = document.getElementById("add-item");
        popupElement.classList.add("popup-hidden");
        //show icon
        addItemIconButtonElement.classList.remove("hidden");
    });
}

addAllEventListeners();