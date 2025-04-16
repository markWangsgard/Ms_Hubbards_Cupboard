import { getRecipe, sendRating } from "./service.js";
import { baseURL } from "./constants.js";
import {
  AddContinueMaking,
  GetContinueMaking,
  getFavorites,
  RemoveContinueMaking,
  ToggleFavoriteRecipe,
} from "./domain.js";

const recipeId = window.location.search?.split("?")[1].split("=")[1];
const setupPage = async () => {
  const recipe = await getRecipe(recipeId);

  document.title = recipe.title;
  //img
  const imgElement = document.getElementById("recipe-photo");
  imgElement.style.backgroundImage = `url(${baseURL + recipe.photoURL})`;
  //title
  const titleElement = document.getElementById("title");
  titleElement.textContent = recipe.title;
  //creator
  const creatorElement = document.getElementById("creator");
  creatorElement.textContent = recipe.creator;
  //time to make
  const durationElement = document.getElementById("duration");
  const durationHoursString =
    recipe.duration.hours > 0
      ? recipe.duration.hours +
        (recipe.duration.hours === 1 ? " Hour" : " Hours")
      : "";
  const durationMinutesString =
    recipe.duration.minutes > 0
      ? " " +
        recipe.duration.minutes +
        (recipe.duration.minutes === 1 ? " Minute" : " Minutes")
      : "";
  const durationString = `Time to make: ${durationHoursString}${durationMinutesString}`;
  durationElement.textContent = durationString;
  //serving size
  const servingSizeElement = document.getElementById("serving-size");
  servingSizeElement.textContent = `Serving Size: ${recipe.servingSize}`;
  //difficulty
  const difficultyContainerElement = document.getElementById("difficulty");
  difficultyContainerElement.replaceChildren();
  for (var i = 0; i < recipe.difficulty; i++) {
    const difficultyImageElement = document.createElement("img");
    difficultyImageElement.src = "../images/chef-hat-solid.svg";
    difficultyImageElement.alt = "Solid Chef Hat";
    difficultyImageElement.classList = "large-icon";
    difficultyContainerElement.appendChild(difficultyImageElement);
  }
  for (var i = 0; i < 5 - recipe.difficulty; i++) {
    const difficultyImageElement = document.createElement("img");
    difficultyImageElement.src = "../images/chef-hat-hollow.svg";
    difficultyImageElement.alt = "Hollow Chef Hat";
    difficultyImageElement.classList = "large-icon";
    difficultyContainerElement.appendChild(difficultyImageElement);
  }
  const difficultyWordElement = document.createElement("p");
  difficultyWordElement.textContent = recipe.difficultyRating;
  difficultyContainerElement.appendChild(difficultyWordElement);
  //rating
  const rateContainerElement = document.getElementById("rate");
  rateContainerElement.replaceChildren();
  const rating = Math.round(recipe.rating, 1);
  for (var i = 0; i < rating; i++) {
    const ratingImageElement = document.createElement("img");
    ratingImageElement.src = "../images/yellow-star.svg";
    ratingImageElement.alt = "yellow star";
    ratingImageElement.classList = "large-icon star";
    rateContainerElement.appendChild(ratingImageElement);
  }
  for (var i = 0; i < 5 - rating; i++) {
    const ratingImageElement = document.createElement("img");
    ratingImageElement.src = "../images/empty-star.svg";
    ratingImageElement.alt = "empty star";
    ratingImageElement.classList = "large-icon star";
    rateContainerElement.appendChild(ratingImageElement);
  }
  const ratingNumberElement = document.createElement("p");
  ratingNumberElement.textContent = recipe.rating.toFixed(1);
  rateContainerElement.appendChild(ratingNumberElement);
  const favoriteButton = document.getElementById("favorite-button");
  const listOfFavorites = getFavorites();
  if (listOfFavorites !== null && listOfFavorites.includes(recipe.id)) {
    favoriteButton.classList = "light-button";
    favoriteButton.textContent = "Favorited";
  } else {
    favoriteButton.classList = "dark-button";
    favoriteButton.textContent = "Favorite";
  }
  favoriteButton.addEventListener("click", (e) => {
    e.preventDefault();
    ToggleFavoriteRecipe(recipe.id);
    setupPage();
  });
  //ingredients
  const ingredientsListElement = document.getElementById("ingredient-list");
  ingredientsListElement.replaceChildren();
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItemElement = document.createElement("li");
    const ingredientString = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
    ingredientItemElement.textContent = ingredientString;
    ingredientsListElement.appendChild(ingredientItemElement);
  });
  //directions
  const directionsListElement = document.getElementById("directions-list");
  directionsListElement.replaceChildren();
  recipe.directions.forEach((direction) => {
    const directionElement = document.createElement("li");
    directionElement.textContent = direction;
    directionsListElement.appendChild(directionElement);
  });
};

const setUpEventListeners = () => {
  const completeButton = document.getElementById("mark-complete-button");
  completeButton.addEventListener("click", (e) => {
    e.preventDefault();
    RemoveContinueMaking(recipeId);
    console.log("Help Me");
    completeButton.classList.add("light-button");
  });

  const star1Element = document.getElementById(`star-1`);
  const star2Element = document.getElementById(`star-2`);
  const star3Element = document.getElementById(`star-3`);
  const star4Element = document.getElementById(`star-4`);
  const star5Element = document.getElementById(`star-5`);
  star1Element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    star1Element.src = "../images/yellow-star.svg";
  });
  star1Element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    star1Element.src = "../images/empty-star.svg";
  });
  star2Element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    star1Element.src = "../images/yellow-star.svg";
    star2Element.src = "../images/yellow-star.svg";
  });
  star2Element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    star1Element.src = "../images/empty-star.svg";
    star2Element.src = "../images/empty-star.svg";
  });
  star3Element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    star1Element.src = "../images/yellow-star.svg";
    star2Element.src = "../images/yellow-star.svg";
    star3Element.src = "../images/yellow-star.svg";
  });
  star3Element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    star1Element.src = "../images/empty-star.svg";
    star2Element.src = "../images/empty-star.svg";
    star3Element.src = "../images/empty-star.svg";
  });
  star4Element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    star1Element.src = "../images/yellow-star.svg";
    star2Element.src = "../images/yellow-star.svg";
    star3Element.src = "../images/yellow-star.svg";
    star4Element.src = "../images/yellow-star.svg";
  });
  star4Element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    star1Element.src = "../images/empty-star.svg";
    star2Element.src = "../images/empty-star.svg";
    star3Element.src = "../images/empty-star.svg";
    star4Element.src = "../images/empty-star.svg";
  });
  star5Element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    star1Element.src = "../images/yellow-star.svg";
    star2Element.src = "../images/yellow-star.svg";
    star3Element.src = "../images/yellow-star.svg";
    star4Element.src = "../images/yellow-star.svg";
    star5Element.src = "../images/yellow-star.svg";
  });
  star5Element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    star1Element.src = "../images/empty-star.svg";
    star2Element.src = "../images/empty-star.svg";
    star3Element.src = "../images/empty-star.svg";
    star4Element.src = "../images/empty-star.svg";
    star5Element.src = "../images/empty-star.svg";
  });

  star1Element.addEventListener("click", async () => {
    await sendRating(1, recipeId);
    await setupPage();
  });
  star2Element.addEventListener("click", async () => {
    await sendRating(2, recipeId);
    await setupPage();
  });
  star3Element.addEventListener("click", async () => {
    await sendRating(3, recipeId);
    await setupPage();
  });
  star4Element.addEventListener("click", async () => {
    await sendRating(4, recipeId);
    await setupPage();
  });
  star5Element.addEventListener("click", async () => {
    await sendRating(5, recipeId);
    await setupPage();
  });
};

setupPage();
setUpEventListeners();
AddContinueMaking(recipeId);
console.log(GetContinueMaking());
