import { GetRecipeId, uploadRecipe } from "./service.js";

const addEventListeners = () => {
  const uploadImageElement = document.getElementById("image");
  uploadImageElement.addEventListener("change", (e) => {
    e.preventDefault();

    const photo = uploadImageElement.files[0];
    if (photo) {
      //reads photo
      const reader = new FileReader();

      //when photo is loaded, set to src
      reader.addEventListener("load", (e) => {
        e.preventDefault();

        const imageElement = document.getElementById("displayPhoto");
        imageElement.src = e.target.result;
      });

      //loading img?
      reader.readAsDataURL(photo);
    }
  });

  const addIngredientButtonElement = document.getElementById(
    "add-ingredient-button"
  );
  addIngredientButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    const quantityElement = document.getElementById("ingredient-quantity");
    const unitElement = document.getElementById("ingredient-unit");
    const nameElement = document.getElementById("ingredient-name");
    const quantityErrorElement = document.getElementById(
      "error-ingredient-quantity"
    );
    const unitErrorElement = document.getElementById("error-ingredient-unit");
    const nameErrorElement = document.getElementById("error-ingredient-name");
    if (!quantityElement.value || !unitElement.value || !nameElement.value) {
      if (!quantityElement.value) {
        quantityErrorElement.classList.remove("hidden");
      } else {
        quantityErrorElement.classList.add("hidden");
      }
      if (!unitElement.value) {
        unitErrorElement.classList.remove("hidden");
      } else {
        unitErrorElement.classList.add("hidden");
      }
      if (!nameElement.value) {
        nameErrorElement.classList.remove("hidden");
      } else {
        nameErrorElement.classList.add("hidden");
      }
    } else {
      const quantity = quantityElement.value;
      const unit = unitElement.value;
      const name = nameElement.value;
      addIngredient(quantity, unit, name);
      quantityElement.value = "";
      unitElement.value = "";
      nameElement.value = "";
    }
  });

  const formElement = document.getElementById("form");
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageInputElement = document.getElementById("image");
    const titleInputElement = document.getElementById("title");
    const creatorInputElement = document.getElementById("creator");
    const servingSizeInputElement = document.getElementById("serving-size");
    const timeToMakeHoursInputElement =
      document.getElementById("time-to-make-hours");
    const timeToMakeMinutesInputElement = document.getElementById(
      "time-to-make-minutes"
    );
    const difficultyInputElement = document.getElementById("difficulty");
    const directionsInputElement = document.getElementById("directions");

    if (
      !imageInputElement.files ||
      !titleInputElement.value ||
      !creatorInputElement.value ||
      !servingSizeInputElement.value ||
      timeToMakeHoursInputElement.value +
        timeToMakeMinutesInputElement.value ===
        0 ||
      !difficultyInputElement.value ||
      !directionsInputElement.value ||
      ingredientsToAdd.length === 0
    ) {
      if (!imageInputElement.value) {
        const imageErrorElement = document.getElementById("error-image");
        imageErrorElement.classList.remove("hidden");
      }
      if (!titleInputElement.value) {
        const titleErrorElement = document.getElementById("error-title");
        titleErrorElement.classList.remove("hidden");
      }
      if (!creatorInputElement.value) {
        const creatorErrorElement = document.getElementById("error-creator");
        creatorErrorElement.classList.remove("hidden");
      }
      if (!servingSizeInputElement.value) {
        const servingSizeErrorElement =
          document.getElementById("error-serving-size");
        servingSizeErrorElement.classList.remove("hidden");
      }
      if (
        timeToMakeHoursInputElement.value +
          timeToMakeMinutesInputElement.value ===
        0
      ) {
        const timeToMakeErrorElement =
          document.getElementById("error-time-to-make");
        timeToMakeErrorElement.classList.remove("hidden");
      }
      if (!difficultyInputElement.value) {
        const difficultyErrorElement =
          document.getElementById("error-difficulty");
        difficultyErrorElement.classList.remove("hidden");
      }
      if (!directionsInputElement.value) {
        const directionsErrorElement =
          document.getElementById("error-directions");
        directionsErrorElement.classList.remove("hidden");
      }
      if (ingredientsToAdd.length === 0) {
        const ingredientsErrorElement =
          document.getElementById("error-ingredients");
        ingredientsErrorElement.classList.remove("hidden");
      }
    } else {
      const newRecipe = {
        Id: -1,
        Title: titleInputElement.value,
        Creator: creatorInputElement.value,
        PhotoURL: "",
        ServingSize: servingSizeInputElement.value,
        Duration: {
          Hours: timeToMakeHoursInputElement.value,
          Minutes: timeToMakeMinutesInputElement.value,
        },
        Difficulty: difficultyInputElement.value,
        Rating: 5,
        Ingredients: ingredientsToAdd,
        Directions: directionsInputElement.value.split("\n"),
      };

      await uploadRecipe(newRecipe, imageInputElement.files[0]);

      const recipeId = await GetRecipeId(titleInputElement.value);

      window.location.href = `./recipe.html?id=${recipeId}`;
    }
  });
};

const ingredientsToAdd = [];
const addIngredient = (Quantity, Unit, Name) => {
  ingredientsToAdd.push({
    quantity: Quantity,
    unit: Unit,
    name: Name,
  });
  generateIngredientElements();
};
const generateIngredientElements = () => {
  const listOfIngredientsElement = document.getElementById(
    "list-of-ingredients"
  );
  listOfIngredientsElement.replaceChildren();
  ingredientsToAdd.forEach((ingredient) => {
    const listItemElement = document.createElement("li");
    const ingredientStringElement = document.createElement("p");
    ingredientStringElement.textContent = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
    const deleteIconElement = document.createElement("img");
    deleteIconElement.src = "../images/delete-icon.svg";
    deleteIconElement.alt = `delete ${ingredient.name}`;
    deleteIconElement.classList = "icon";

    listItemElement.appendChild(ingredientStringElement);
    listItemElement.appendChild(deleteIconElement);
    listOfIngredientsElement.appendChild(listItemElement);

    deleteIconElement.addEventListener("click", (e) => {
      e.preventDefault();
      const index = ingredient.index;
      ingredientsToAdd.splice(index, 1);
      generateIngredientElements();
    });
  });
};

addEventListeners();
generateIngredientElements();
