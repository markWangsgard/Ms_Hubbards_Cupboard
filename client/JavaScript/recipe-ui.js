import { getRecipe } from "./service.js";

const recipeId = window.location.search?.split("?")[1].split("=")[1];
const setupPage = async () => {
    
    const recipe = await getRecipe(recipeId);
    console.log(recipe)
    
    document.title = recipe.title;
    //img
    const imgElement = document.getElementById("recipe-photo");
    imgElement.style.backgroundImage = `url(${recipe.photoURL})`
    //title
    const titleElement = document.getElementById("title");
    titleElement.textContent = recipe.title;
    //creator
    const creatorElement = document.getElementById("creator");
    creatorElement.textContent = recipe.creator;
    //time to make
    const durationElement = document.getElementById("duration")
    const durationHoursString = recipe.duration.hours > 0 ? recipe.duration.hours + (recipe.duration.hours === 1 ? " Hour" : " Hours") : "";
    const durationMinutesString = recipe.duration.minutes > 0 ? " " + recipe.duration.minutes + (recipe.duration.minutes === 1 ? " Minute" : " Minutes") : "";
    const durationString = `Time to make: ${durationHoursString}${durationMinutesString}`;
    durationElement.textContent = durationString;
    //serving size
    const servingSizeElement = document.getElementById("serving-size");
    servingSizeElement.textContent = `Serving Size: ${recipe.servingSize}`;
    //difficulty
    const difficultyContainerElement = document.getElementById("difficulty");
    difficultyContainerElement.replaceChildren();
    for(var i = 0; i < recipe.difficulty; i++)
    {
        const difficultyImageElement = document.createElement("img");
        difficultyImageElement.src = "/images/chef-hat-solid.svg";
        difficultyImageElement.alt = "Solid Chef Hat";
        difficultyImageElement.classList = "large-icon";
        difficultyContainerElement.appendChild(difficultyImageElement);
    }
    for(var i = 0; i < 5-recipe.difficulty; i++)
        {
            const difficultyImageElement = document.createElement("img");
            difficultyImageElement.src = "/images/chef-hat-hollow.svg";
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
    const rating = Math.round(recipe.rating);
    for(var i = 0; i < rating; i++)
        {
            const ratingImageElement = document.createElement("img");
            ratingImageElement.src = "/images/yellow-star.svg";
            ratingImageElement.alt = "yellow star";
            ratingImageElement.classList = "large-icon star";
            rateContainerElement.appendChild(ratingImageElement);
        }
        for(var i = 0; i < 5-rating; i++)
            {
                const ratingImageElement = document.createElement("img");
                ratingImageElement.src = "/images/empty-star.svg";
                ratingImageElement.alt = "empty star";
                ratingImageElement.classList = "large-icon star";
                rateContainerElement.appendChild(ratingImageElement);
            }
        const ratingNumberElement = document.createElement("p");
        ratingNumberElement.textContent = recipe.rating;
        rateContainerElement.appendChild(ratingNumberElement);
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
}
setupPage();