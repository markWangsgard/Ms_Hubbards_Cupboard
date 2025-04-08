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
    const nameInputElement = document.getElementById("name");
    const quantityInputElement = document.getElementById("quantity");
    const unitsInputElement = document.getElementById("units");
    if (
      !nameInputElement.value ||
      !quantityInputElement.value ||
      !unitsInputElement.value
    ) {
        const nameErrorElement = document.getElementById("error-name");
        const quantityErrorElement = document.getElementById("error-quantity");
        const unitsErrorElement = document.getElementById("error-units");
        nameErrorElement.classList = "error remove"
        quantityErrorElement.classList = "error remove"
        unitsErrorElement.classList = "error remove"
        if(!nameInputElement.value)
        {
            nameErrorElement.classList.remove("remove");
        }
        if (!quantityInputElement.value) {
            quantityErrorElement.classList.remove("remove");
        }
        if (!unitsInputElement.value)
        {
            unitsErrorElement.classList.remove("remove");
        }
    } else {
      //add item
      const newItem = {
        name: nameInputElement.value,
        quantity: quantityInputElement.value,
        unit: unitsInputElement.value,
      };
      addItem(newItem);
      //clears input
      nameInputElement.value = "";
      quantityInputElement.value = "";
      unitsInputElement.value = "";
      //unlocks background
      const bodyElement = document.getElementById("body");
      bodyElement.style = "overflow-y: auto;";
      //removes popup
      const popupElement = document.getElementById("add-item");
      popupElement.classList.add("popup-hidden");
      //show icon
      addItemIconButtonElement.classList.remove("hidden");
    }
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
};

addAllEventListeners();
