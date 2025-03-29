import { getAllRecipes } from "./service.js";

const generateCard = (recipe) => {
  const cardElement = document.createElement("div");
  cardElement.classList = "recipe-card";
  cardElement.id = "recipe" + recipe.id

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
    const difficultyContainerElement = document.createElement("div");
    for(var i = 0; i < recipe.difficulty; i++)
    {
        const difficultyImageElement = document.createElement("img");
        difficultyImageElement.src = "/images/chef-hat-solid.svg";
        difficultyImageElement.alt = "Solid Chef Hat";
        difficultyImageElement.classList = "icon";
        difficultyContainerElement.appendChild(difficultyImageElement);
    }
    for(var i = 0; i < 5-recipe.difficulty; i++)
        {
            const difficultyImageElement = document.createElement("img");
            difficultyImageElement.src = "/images/chef-hat-hollow.svg";
            difficultyImageElement.alt = "Hollow Chef Hat";
            difficultyImageElement.classList = "icon";
            difficultyContainerElement.appendChild(difficultyImageElement);
        }
    const difficultyWordElement = document.createElement("p");
    difficultyWordElement.textContent = recipe.difficultyRating;

    const rateContainerElement = document.createElement("div");
    const rating = Math.round(recipe.rating);
    for(var i = 0; i < rating; i++)
        {
            const ratingImageElement = document.createElement("img");
            ratingImageElement.src = "/images/yellow-star.svg";
            ratingImageElement.alt = "yellow star";
            ratingImageElement.classList = "icon star";
            rateContainerElement.appendChild(ratingImageElement);
        }
        for(var i = 0; i < 5-rating; i++)
            {
                const ratingImageElement = document.createElement("img");
                ratingImageElement.src = "/images/empty-star.svg";
                ratingImageElement.alt = "empty star";
                ratingImageElement.classList = "icon star";
                rateContainerElement.appendChild(ratingImageElement);
            }
        const ratingNumberElement = document.createElement("p");
        ratingNumberElement.textContent = recipe.rating;

    // todo: Set if recipe is favorited
    const favoriteIconElement = document.createElement("img");
    favoriteIconElement.src = "/images/solid-bookmark.svg";
    favoriteIconElement.alt = "Favorited Recipe";
    favoriteIconElement.classList = "large-icon favorite-icon";
    const favoriteButtonElement = document.createElement("button");
    favoriteButtonElement.textContent = "Favorite"
    favoriteButtonElement.classList = "button-favorited";
    // for when recipe isn't favorite
    // favoriteButtonElement.classList = "button-not-favorited";


    cardElement.appendChild(recipeIconElement);
    recipeIconElement.appendChild(imageElement);
    recipeIconElement.appendChild(servingSizeElement);
    cardElement.appendChild(recipeInfoElement);
    recipeInfoElement.appendChild(titleElement);
    recipeInfoElement.appendChild(creatorElement);
    recipeInfoElement.appendChild(difficultyContainerElement);
    difficultyContainerElement.appendChild(difficultyWordElement);
    recipeInfoElement.appendChild(rateContainerElement);
    rateContainerElement.appendChild(ratingNumberElement);
    cardElement.appendChild(favoriteIconElement);
    cardElement.appendChild(favoriteButtonElement);

  return cardElement;
};

const newRecipe = {
    id: 1,
    title: "Pancakes",
    creator: "Mark Wangsgard",
    photoURL: "/images/pancakes.jpg",
    servingSize: 3,
    difficultyRating: "Easy",
    difficulty: 1,
    rating: 4,
    ingredients: [],
    directions: []
}

// console.log(generateCard(newRecipe));
const allRecipesContainerElement = document.getElementById("all-recipes-container");

const allRecipes = await getAllRecipes();
allRecipes.forEach(recipe => {
    allRecipesContainerElement.appendChild(generateCard(recipe));
});
// allRecipesContainerElement.appendChild(generateCard(newRecipe));