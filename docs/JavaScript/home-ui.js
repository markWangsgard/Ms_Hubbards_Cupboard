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
  var difficultyText;
  switch (recipe.difficulty) {
    case 1:
      difficultyText = "Easy";
      break;
    case 2:
      difficultyText = "Standard";
      break;
    case 3:
      difficultyText = "Medium";
      break;
    case 4:
      difficultyText = "Intermediate";
      break;
    case 5:
      difficultyText = "Hard";
      break;
  }
  difficultyWordElement.textContent = difficultyText;

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
    window.location.href = `./html/recipe.html?id=${recipe.id}`;
  });

  return cardElement;
};

const addAllEventListeners = () => {
  const searchBarElement = document.getElementById("search-bar");
  const filterElement = document.getElementById("filter");
  const servingSizeElement = document.getElementById("ServingSizeQuantity");

  searchBarElement.addEventListener("input", (e) => {
    e.preventDefault();
    const searchValue = searchBarElement.value;
    const filterValue = filterElement.value;
    const servingSizeValue = servingSizeElement.value;

    hideSections();
    console.log(filterValue);
    if (filterValue === "ServingSize") {
      servingSizeElement.classList.remove("remove");
      generateSearchedRecipes(searchValue, filterValue + servingSizeValue);
    } else if (filterValue !== "none") {
      servingSizeElement.classList.add("remove");
      generateSearchedRecipes(searchValue, filterValue);
    } else {
      showSections();
      generateAllRecipes();
    }
  });

  filterElement.addEventListener("input", (e) => {
    e.preventDefault();
    const searchValue = searchBarElement.value;
    const filterValue = filterElement.value;
    const servingSizeValue = servingSizeElement.value;

    if (filterValue === "none") {
      servingSizeElement.classList.add("remove");
      if (searchValue) {
        hideSections();
        generateSearchedRecipes(searchValue, filterValue);
      } else {
        showSections();
        generateAllRecipes();
      }
    } else if (filterValue === "ServingSize") {
      hideSections();
      servingSizeElement.classList.remove("remove");
      generateSearchedRecipes(searchValue, filterValue + servingSizeValue);
    } else if (filterValue === "Favorites") {
      servingSizeElement.classList.add("remove");
      //todo: Filter by favorites
    } else {
      servingSizeElement.classList.add("remove");
      hideSections();
      generateSearchedRecipes(searchValue, filterValue);
    }
  });

  servingSizeElement.addEventListener("input", (e) => {
    e.preventDefault();
    const searchValue = searchBarElement.value;
    const filterValue = filterElement.value;
    const servingSizeValue = servingSizeElement.value;

    if (filterValue === "ServingSize") {
      hideSections();
      servingSizeElement.classList.remove("remove");
      generateSearchedRecipes(searchValue, filterValue + servingSizeValue);
    } else {
      servingSizeElement.classList.add("remove");
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

const generateSearchedRecipes = async (searchValue, filterValue) => {
  allRecipesContainerElement.replaceChildren();
  const searchedRecipes = await SearchRecipes(searchValue, filterValue);
  searchedRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    allRecipesContainerElement.appendChild(card);
  });
};

const hideSections = () => {
  const continueMakingSectionElement = document.getElementById(
    "continue-making-section"
  );
  const favoritesSectionElement = document.getElementById("favorites-section");
  const popularSectionElement = document.getElementById("popular-section");
  const allRecipesTitleElement = document.getElementById("all-recipes-title");

  continueMakingSectionElement.classList.add("remove");
  favoritesSectionElement.classList.add("remove");
  popularSectionElement.classList.add("remove");
  allRecipesTitleElement.classList.add("remove");
};
const showSections = () => {
  const continueMakingSectionElement = document.getElementById(
    "continue-making-section"
  );
  const favoritesSectionElement = document.getElementById("favorites-section");
  const popularSectionElement = document.getElementById("popular-section");
  const allRecipesTitleElement = document.getElementById("all-recipes-title");
  const quantityElement = document.getElementById("ServingSizeQuantity");
  continueMakingSectionElement.classList.remove("remove");
  favoritesSectionElement.classList.remove("remove");
  popularSectionElement.classList.remove("remove");
  allRecipesTitleElement.classList.remove("remove");
  quantityElement.classList.add("remove");
};

generateAllRecipes();
addAllEventListeners();
