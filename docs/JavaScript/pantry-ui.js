import { getAllItems, addItem, removeItem, getItem } from "./domain.js";

const allowDrop = (e) => {
  e.preventDefault();
};
const drag = (e, itemName) => {
  e.dataTransfer.setData("text", itemName);
  const deleteButtonElement = document.getElementById("delete-item-icon");
  deleteButtonElement.classList.remove("hidden");
};

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
    // sets submit button to add item
    const submitButtonElement = document.getElementById("add-item-button");
    submitButtonElement.value = "Add Item";
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
      nameErrorElement.classList = "error remove";
      quantityErrorElement.classList = "error remove";
      unitsErrorElement.classList = "error remove";
      if (!nameInputElement.value) {
        nameErrorElement.classList.remove("remove");
      }
      if (!quantityInputElement.value) {
        quantityErrorElement.classList.remove("remove");
      }
      if (!unitsInputElement.value) {
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
      //Update item: removes old one
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
      //generate new cards
      generateItemCards();
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

  const deleteButtonElement = document.getElementById("delete-item-icon");
  deleteButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    deleteButtonElement.style.backgroundColor = "red";
  });
  deleteButtonElement.addEventListener("dragover", (e) => {
    allowDrop(e);
  });
  deleteButtonElement.addEventListener("drop", (e) => {
    e.preventDefault();
    deleteButtonElement.classList.add("hidden");
    const itemName = e.dataTransfer.getData("text");
    const itemToDelete = getItem(itemName);
    removeItem(itemToDelete);
    generateItemCards();
  });
};

const generateItemCards = () => {
  const itemList = getAllItems();
  const itemListContainerElement = document.getElementById("item-list");
  itemListContainerElement.replaceChildren();
  itemList.forEach((item) => {
    const itemCardElement = document.createElement("div");
    itemCardElement.classList = "item";
    itemCardElement.setAttribute("draggable", true);
    itemCardElement.addEventListener("drag", (e) => {
      e.preventDefault();
      drag(e, item.name);
    });
    itemCardElement.addEventListener("dragend", (e) => {
      e.preventDefault();
      const deleteButtonElement = document.getElementById("delete-item-icon");
      deleteButtonElement.classList.add("hidden");
    });

    const nameElement = document.createElement("p");
    nameElement.textContent = `${item.name}:`;

    const quantityElement = document.createElement("p");
    const quantityString = `${item.quantity} ${item.unit}`;
    quantityElement.textContent = quantityString;

    const editButtonElement = document.createElement("img");
    editButtonElement.src = "/images/edit-icon.svg";
    editButtonElement.alt = "Edit Item";
    editButtonElement.classList = "icon";

    itemCardElement.appendChild(nameElement);
    itemCardElement.appendChild(quantityElement);
    itemCardElement.appendChild(editButtonElement);

    itemListContainerElement.appendChild(itemCardElement);

    editButtonElement.addEventListener("click", (e) => {
      e.preventDefault();
      itemCardElement.draggable = false;
      itemCardElement.replaceChildren();
      const titleCardInputElement = document.createElement("input");
      titleCardInputElement.value = item.name;

      const quantityCardInputElement = document.createElement("input");
      quantityCardInputElement.type = "number";
      quantityCardInputElement.value = item.quantity;

      const unitCardSelectElement = document.createElement("select");
      const option1Element = document.createElement("option");
      option1Element.value = "Cups";
      option1Element.textContent = "Cup(s)";
      const option2Element = document.createElement("option");
      option2Element.value = "Tablespoons";
      option2Element.textContent = "Tablespoon(s)";
      const option3Element = document.createElement("option");
      option3Element.value = "Teaspoons";
      option3Element.textContent = "Teaspoon(s)";
      const option4Element = document.createElement("option");
      option4Element.value = "Pounds";
      option4Element.textContent = "Pound(s)";
      const option5Element = document.createElement("option");
      option5Element.value = "Ounces";
      option5Element.textContent = "Ounce(s)";
      const option6Element = document.createElement("option");
      option6Element.value = "Ounce-can";
      option6Element.textContent = "Ounce(s) Can)";
      const option7Element = document.createElement("option");
      option7Element.value = "Count";
      option7Element.textContent = "Count (example: eggs)";
      unitCardSelectElement.appendChild(option1Element);
      unitCardSelectElement.appendChild(option2Element);
      unitCardSelectElement.appendChild(option3Element);
      unitCardSelectElement.appendChild(option4Element);
      unitCardSelectElement.appendChild(option5Element);
      unitCardSelectElement.appendChild(option6Element);
      unitCardSelectElement.appendChild(option7Element);
      unitCardSelectElement.value = item.unit;

      const saveButtonIconElement = document.createElement("img");
      saveButtonIconElement.src = "/images/check-icon.svg";
      saveButtonIconElement.alt = "Save Item";
      saveButtonIconElement.classList = "icon";

      itemCardElement.appendChild(titleCardInputElement);
      itemCardElement.appendChild(quantityCardInputElement);
      itemCardElement.appendChild(unitCardSelectElement);
      itemCardElement.appendChild(saveButtonIconElement);

      saveButtonIconElement.addEventListener("click", (e) => {
        e.preventDefault();
        const newItem = {
            name: titleCardInputElement.value,
            quantity: quantityCardInputElement.value,
            unit: unitCardSelectElement.value,
          };
          removeItem(item);
          addItem(newItem);
          generateItemCards();
      })
    });
  });
};
const editItem = (itemCardElement, item) => {};

addAllEventListeners();
generateItemCards();
