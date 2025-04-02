const addEventListeners = () => {
    const addIngredientButtonElement = document.getElementById("add-ingredient-button");
    addIngredientButtonElement.addEventListener("click", (e) => {
        e.preventDefault()
        const quantityElement = document.getElementById("ingredient-quantity");
        const unitElement = document.getElementById("ingredient-unit");
        const nameElement = document.getElementById("ingredient-name");
        const quantityErrorElement = document.getElementById("error-ingredient-quantity");
        const unitErrorElement = document.getElementById("error-ingredient-unit");
        const nameErrorElement = document.getElementById("error-ingredient-name");
        if (!quantityElement.value || !unitElement.value || !nameElement.value) {

            if (!quantityElement.value) {
                quantityErrorElement.classList.remove("hidden");
            }
            else {
                quantityErrorElement.classList.add("hidden");
            }
            if (!unitElement.value) {
                unitErrorElement.classList.remove("hidden");
            }
            else {
                unitErrorElement.classList.add("hidden");
            }
            if (!nameElement.value) {
                nameErrorElement.classList.remove("hidden");
            }
            else {
                nameErrorElement.classList.add("hidden");
            }
        }
        else {
            const quantity = quantityElement.value;
            const unit = unitElement.value;
            const name = nameElement.value;
            addIngredient(quantity, unit, name);
        }
        
    })
    
};

const ingredientsToAdd = [{quantity: 1, unit: "Cups", name: "Shredded Cheese"}];
const addIngredient = (Quantity, Unit, Name) => {
    ingredientsToAdd.push({
        quantity: Quantity,
        unit: Unit,
        name: Name,
    });
    generateIngredientElements();
}
const generateIngredientElements = () => {
    const listOfIngredientsElement = document.getElementById("list-of-ingredients");
    listOfIngredientsElement.replaceChildren();
    ingredientsToAdd.forEach((ingredient) => {
        const listItemElement = document.createElement("li");
        const ingredientStringElement = document.createElement("p");
        ingredientStringElement.textContent = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
        const deleteIconElement = document.createElement("img");
        deleteIconElement.src = "/images/delete-icon.svg";
        deleteIconElement.alt = `delete ${ingredient.name}`
        deleteIconElement.classList = "icon";
        
        listItemElement.appendChild(ingredientStringElement);
        listItemElement.appendChild(deleteIconElement);
        listOfIngredientsElement.appendChild(listItemElement);

        deleteIconElement.addEventListener("click", (e) => {
            e.preventDefault();
            const index = ingredient.index;
            ingredientsToAdd.splice(index,1);
            generateIngredientElements();
        })
    });
}

addEventListeners();
generateIngredientElements();