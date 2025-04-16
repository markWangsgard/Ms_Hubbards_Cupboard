import { baseURL } from "./constants.js";
import {
  GetContinueMaking,
  getFavorites,
  RemoveContinueMaking,
  ToggleFavoriteRecipe,
} from "./domain.js";
import { getAllRecipes, SearchRecipes } from "./service.js";

const generateCard = async (recipe) => {
  const cardElement = document.createElement("div");
  cardElement.classList = "recipe-card";
  cardElement.id = "recipe" + recipe.id;

  const recipeIconElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  imageElement.src = baseURL + recipe.photoURL;
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
  ratingNumberElement.textContent = recipe.rating.toFixed(1);

  const iconDivElement = document.createElement("div");
  iconDivElement.classList = "iconDiv";
  const favoriteIconElement = document.createElement("img");
  favoriteIconElement.alt = "Favorited Recipe";
  favoriteIconElement.id = "favoriteIcon" + recipe.id;
  favoriteIconElement.classList = "large-icon favorite-icon";
  const favoriteButtonElement = document.createElement("button");
  favoriteButtonElement.classList = "favoriteButton";
  favoriteButtonElement.id = "favoriteButton" + recipe.id;

  const favoritesList = getFavorites();
  if (favoritesList !== null && favoritesList.includes(recipe.id)) {
    favoriteIconElement.src = "../images/solid-bookmark.svg";
    favoriteButtonElement.textContent = "Favorited";
    favoriteButtonElement.classList.add("light-button");
  } else {
    favoriteIconElement.src = "../images/empty-bookmark.svg";
    favoriteButtonElement.textContent = "Favorite";
    favoriteButtonElement.classList.add("dark-button");
  }

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
  iconDivElement.appendChild(favoriteIconElement);
  cardElement.appendChild(iconDivElement);
  cardElement.appendChild(favoriteButtonElement);

  favoriteIconElement.addEventListener("click", (e) => {
    e.preventDefault();
    ToggleFavoriteRecipe(recipe.id);
    const favoritesList = getFavorites();
    if (favoritesList !== null && favoritesList.includes(recipe.id)) {
      favoriteIconElement.src = "../images/solid-bookmark.svg";
      favoriteButtonElement.textContent = "Favorited";
      favoriteButtonElement.classList = "light-button";
    } else {
      favoriteIconElement.src = "../images/empty-bookmark.svg";
      favoriteButtonElement.textContent = "Favorite";
      favoriteButtonElement.classList = "dark-button";
    }
    generateFavoriteRecipes();
  });
  favoriteButtonElement.addEventListener("click", (e) => {
    e.preventDefault();
    ToggleFavoriteRecipe(recipe.id);
    const favoritesList = getFavorites();
    if (favoritesList !== null && favoritesList.includes(recipe.id)) {
      favoriteIconElement.src = "../images/solid-bookmark.svg";
      favoriteButtonElement.textContent = "Favorited";
      favoriteButtonElement.classList = "light-button";
    } else {
      favoriteIconElement.src = "../images/empty-bookmark.svg";
      favoriteButtonElement.textContent = "Favorite";
      favoriteButtonElement.classList = "dark-button";
    }
    generateFavoriteRecipes();
  });
  cardElement.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      e.target.id != "favoriteIcon" + recipe.id &&
      e.target.id != "favoriteButton" + recipe.id &&
      e.target.id != "completeButton" + recipe.id &&
      e.target.id != "completeIcon" + recipe.id
    ) {
      window.location.href = `./recipe.html?id=${recipe.id}`;
    }
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

const generateContinueMaking = async () => {
  const continueMakingSectionElement = document.getElementById(
    "continue-making-section"
  );
  const continueMakingContainerElement = document.getElementById(
    "continue-making-container"
  );
  continueMakingContainerElement.replaceChildren();
  const allRecipes = await getAllRecipes();
  const continueMakingIds = GetContinueMaking();
  const continueMakingRecipes = allRecipes.filter((recipe) =>
    continueMakingIds.includes(recipe.id.toString())
  );
  if (continueMakingRecipes.length == 0) {
    continueMakingSectionElement.classList.add("remove");
  } else {
    continueMakingSectionElement.classList.remove("remove");
  }
  continueMakingRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    const markCompleteButtonElement = document.createElement("button");
    markCompleteButtonElement.textContent = "Mark as Complete";
    markCompleteButtonElement.id = "completeButton" + recipe.id;
    markCompleteButtonElement.classList = "dark-button mark-complete";

    const iconDivElement = card.querySelector(".iconDiv");
    const markCompleteIconElement = document.createElement("img");
    markCompleteIconElement.src = "../images/check-icon.svg";
    markCompleteIconElement.alt = "Mark Recipe Complete";
    markCompleteIconElement.classList = "large-icon favorite-icon";
    markCompleteIconElement.id = "completeIcon" + recipe.id;
    iconDivElement.appendChild(markCompleteIconElement);

    card.appendChild(markCompleteButtonElement);
    continueMakingContainerElement.appendChild(card);

    markCompleteButtonElement.addEventListener("click", (e) => {
      e.preventDefault();
      RemoveContinueMaking(recipe.id);
      generateContinueMaking();
    });
    markCompleteIconElement.addEventListener("click", (e) => {
      e.preventDefault();
      RemoveContinueMaking(recipe.id);
      generateContinueMaking();
    });
  });
};

const generateFavoriteRecipes = async () => {
  const favoriteRecipesSectionElement =
    document.getElementById("favorites-section");
  const favoriteRecipesContainerElement = document.getElementById(
    "favorite-recipes-container"
  );
  favoriteRecipesContainerElement.replaceChildren();
  const allRecipes = await getAllRecipes();
  const favoriteRecipeIds = getFavorites();
  const favoriteRecipes = allRecipes.filter((r) =>
    favoriteRecipeIds.includes(r.id)
  );
  if (favoriteRecipes.length == 0) {
    favoriteRecipesSectionElement.classList.add("remove");
  } else {
    favoriteRecipesSectionElement.classList.remove("remove");
  }
  favoriteRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    favoriteRecipesContainerElement.appendChild(card);
  });
};

const generatePopularRecipes = async () => {
  const popularRecipesContainerElement = document.getElementById(
    "popular-recipes-container"
  );
  popularRecipesContainerElement.replaceChildren();
  const popularRecipes = await SearchRecipes("", "Popular");
  popularRecipes.slice(0, 6).forEach(async (recipe) => {
    const card = await generateCard(recipe);
    popularRecipesContainerElement.appendChild(card);
  });
};

const generateAllRecipes = async () => {
  const allRecipesContainerElement = document.getElementById(
    "all-recipes-container"
  );
  allRecipesContainerElement.replaceChildren();
  const allRecipes = await getAllRecipes();
  allRecipes.forEach(async (recipe) => {
    const card = await generateCard(recipe);
    allRecipesContainerElement.appendChild(card);
  });
};

const generateSearchedRecipes = async (searchValue, filterValue) => {
  const allRecipesContainerElement = document.getElementById(
    "all-recipes-container"
  );
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
  const continueMakingList = GetContinueMaking();
  const favoritesList = getFavorites();

  const continueMakingSectionElement = document.getElementById(
    "continue-making-section"
  );
  const favoritesSectionElement = document.getElementById("favorites-section");
  const popularSectionElement = document.getElementById("popular-section");
  const allRecipesTitleElement = document.getElementById("all-recipes-title");
  const quantityElement = document.getElementById("ServingSizeQuantity");

  if (!continueMakingList) {
    continueMakingSectionElement.classList.remove("remove");
  }
  if (!favoritesList) {
    favoritesSectionElement.classList.remove("remove");
  }
  popularSectionElement.classList.remove("remove");
  allRecipesTitleElement.classList.remove("remove");
  quantityElement.classList.add("remove");
};

generateContinueMaking();
generateFavoriteRecipes();
generatePopularRecipes();
generateAllRecipes();
addAllEventListeners();
