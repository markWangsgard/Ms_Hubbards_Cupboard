import { getAllRecipes, SearchRecipes } from "./service.js";

const generateCard = async (recipe) => {
  const cardElement = document.createElement("div");
  cardElement.classList = "recipe-card";
  cardElement.id = "recipe" + recipe.id;

  const recipeIconElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  imageElement.src = recipe.photoURL;
  imageElement.alt = recipe.title;
  const servingSizeElement = document.createElement("figcaption");
  servingSizeElement.textContent = "Serving Size: " + recipe.servingSize;

  const recipeInfoElement = document.createElement("article");
  const titleElement = document.createElement("h3");
  titleElement.textContent = recipe.title;
  const creatorElement = document.createElement("h4");
  creatorElement.textContent = recipe.creator;
  const durationElement = document.createElement("p");
  durationElement.classList = "time-to-make";
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
  const difficultyContainerElement = document.createElement("div");
  for (var i = 0; i < recipe.difficulty; i++) {
    const difficultyImageElement = document.createElement("img");
    difficultyImageElement.src = "../images/chef-hat-solid.svg";
    difficultyImageElement.alt = "Solid Chef Hat";
    difficultyImageElement.classList = "icon";
    difficultyContainerElement.appendChild(difficultyImageElement);
  }
  for (var i = 0; i < 5 - recipe.difficulty; i++) {
    const difficultyImageElement = document.createElement("img");
    difficultyImageElement.src = "../images/chef-hat-hollow.svg";
    difficultyImageElement.alt = "Hollow Chef Hat";
    difficultyImageElement.classList = "icon";
    difficultyContainerElement.appendChild(difficultyImageElement);
  }
  const difficultyWordElement = document.createElement("p");
  difficultyWordElement.textContent = recipe.difficultyRating;

  const rateContainerElement = document.createElement("div");
  const rating = Math.round(recipe.rating);
  for (var i = 0; i < rating; i++) {
    const ratingImageElement = document.createElement("img");
    ratingImageElement.src = "../images/yellow-star.svg";
    ratingImageElement.alt = "yellow star";
    ratingImageElement.classList = "icon star";
    rateContainerElement.appendChild(ratingImageElement);
  }
  for (var i = 0; i < 5 - rating; i++) {
    const ratingImageElement = document.createElement("img");
    ratingImageElement.src = "../images/empty-star.svg";
    ratingImageElement.alt = "empty star";
    ratingImageElement.classList = "icon star";
    rateContainerElement.appendChild(ratingImageElement);
  }
  const ratingNumberElement = document.createElement("p");
  ratingNumberElement.textContent = recipe.rating;

  // todo: Set if recipe is favorited
  const favoriteIconElement = document.createElement("img");
  favoriteIconElement.src = "../images/solid-bookmark.svg";
  favoriteIconElement.alt = "Favorited Recipe";
  favoriteIconElement.classList = "large-icon favorite-icon";
  const favoriteButtonElement = document.createElement("button");
  favoriteButtonElement.textContent = "Favorite";
  favoriteButtonElement.classList = "button-favorited";
  // for when recipe isn't favorite
  // favoriteButtonElement.classList = "button-not-favorited";

  cardElement.appendChild(recipeIconElement);
  recipeIconElement.appendChild(imageElement);
  recipeIconElement.appendChild(servingSizeElement);
  cardElement.appendChild(recipeInfoElement);
  recipeInfoElement.appendChild(titleElement);
  recipeInfoElement.appendChild(creatorElement);
  recipeInfoElement.appendChild(durationElement);
  recipeInfoElement.appendChild(difficultyContainerElement);
  difficultyContainerElement.appendChild(difficultyWordElement);
  recipeInfoElement.appendChild(rateContainerElement);
  rateContainerElement.appendChild(ratingNumberElement);
  cardElement.appendChild(favoriteIconElement);
  cardElement.appendChild(favoriteButtonElement);

  cardElement.addEventListener("click", (e) => {
    window.location.href = `http://127.0.0.1:5500/html/recipe.html?id=${recipe.id}`;
  });

  return cardElement;
};

const addAllEventListeners = () => {
  const searchBarElement = document.getElementById("search-bar");
  searchBarElement.addEventListener("input", async (e) => {
    e.preventDefault();
    const searchValue = searchBarElement.value.toLowerCase();
    const continueMakingSectionElement = document.getElementById(
      "continue-making-section"
    );
    const favoritesSectionElement =
      document.getElementById("favorites-section");
    const popularSectionElement = document.getElementById("popular-section");
    const allRecipesTitleElement = document.getElementById("all-recipes-title");
    if (searchValue) {
      continueMakingSectionElement.classList.add("remove");
      favoritesSectionElement.classList.add("remove");
      popularSectionElement.classList.add("remove");
      allRecipesTitleElement.classList.add("remove");
      await generateSearchedRecipes(searchValue);
    } else {
      console.log("boo");
      continueMakingSectionElement.classList.remove("remove");
      favoritesSectionElement.classList.remove("remove");
      popularSectionElement.classList.remove("remove");
      allRecipesTitleElement.classList.remove("remove");
      generateAllRecipes();
    }
  });
};

const allRecipesContainerElement = document.getElementById(
  "all-recipes-container"
);

const generateAllRecipes = async () => {
  allRecipesContainerElement.replaceChildren();
  const allRecipes = await getAllRecipes();
  allRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    allRecipesContainerElement.appendChild(card);
  });
};

const generateSearchedRecipes = async (searchValue) => {
  allRecipesContainerElement.replaceChildren();
  const searchedRecipes = await SearchRecipes(searchValue);
  console.log(searchedRecipes);
  searchedRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    allRecipesContainerElement.appendChild(card);
  });
};

generateAllRecipes();
addAllEventListeners();
