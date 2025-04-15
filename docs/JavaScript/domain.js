export const addItem = (item) => {
  const itemList = getAllItems();
  itemList.push(item);

  localStorage.setItem("item-list", JSON.stringify(itemList));
};
export const getAllItems = () => {
  return JSON.parse(localStorage.getItem("item-list"));
};
export const getItem = (itemName) => {
  const itemList = getAllItems();
  return itemList.find((item) => {
    item.name === itemName;
  });
};
export const removeItem = (itemIndex) => {
  const listOfItems = getAllItems();

  listOfItems.splice(itemIndex, 1);
  localStorage.setItem("item-list", JSON.stringify(listOfItems));
};
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites"));
}
export const favoriteRecipe = (recipeId) => {
  const favoriteRecipes = getFavorites();
  favoriteRecipes.push(recipeId);

  localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
};
export const unfavoriteRecipe = (recipeId) => {
  const favoriteRecipes = getFavorites();
  const idIndex = favoriteRecipes.indexOf(recipeId);
  favoriteRecipes.splice(idIndex,1);

  localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
};