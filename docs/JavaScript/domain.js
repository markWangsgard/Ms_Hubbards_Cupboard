export const addItem = (item) => {
  const storedItems = getAllItems();
  const itemList = [];
  storedItems?.forEach((i) => {
    itemList.push(i);
  })
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

  if(listOfItems!==null && listOfItems.map((i) => i.id).includes(itemIndex))
  {
    listOfItems.splice(itemIndex, 1);
  }
  localStorage.setItem("item-list", JSON.stringify(listOfItems));
};
export const editItem = (itemIndex, newItem) => {
  const listOfItems = getAllItems();
  const ingredientToEdit = listOfItems[itemIndex];
  ingredientToEdit.name = newItem.name;
  ingredientToEdit.quantity = newItem.quantity;
  ingredientToEdit.units = newItem.units;
  localStorage.setItem("item-list", JSON.stringify(listOfItems));
};
export const removeUsedItems = (ingredients) => {
  const listOfItems = getAllItems();
  ingredients.forEach((ingredient) => {
    const ingredientToEdit = listOfItems.find(item => item.name == ingredient.name);
    if (ingredientToEdit.units == ingredient.units) {
      ingredientToEdit.quantity -= ingredient.quantity;
    }
    if (ingredientToEdit.quantity <= 0) {
      const itemIndex = listOfItems.findIndex(i => i.name == ingredientToEdit.name);
      listOfItems.splice(itemIndex,1);
    }
  });
  localStorage.setItem("item-list", JSON.stringify(listOfItems));
}
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites"));
};
export const ToggleFavoriteRecipe = (recipeId) => {
  const storedFavorites = getFavorites();
  const favoriteRecipes = [];
  storedFavorites?.forEach((id) => {
    favoriteRecipes.push(id);
  });
  if (favoriteRecipes !== null && favoriteRecipes.includes(recipeId)) {
    const idIndex = favoriteRecipes.indexOf(recipeId);
    favoriteRecipes.splice(idIndex, 1);
  } else {
    favoriteRecipes.push(recipeId);
  }

  localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
};
export const GetContinueMaking = () => {
  return JSON.parse(localStorage.getItem("continue-making"));
};
export const ToggleContinueMaking = (recipeId) => {
  const storedContinue = GetContinueMaking();
  const continueMakingRecipes = [];
  storedContinue?.forEach((id) => {
    continueMakingRecipes.push(id);
  });
  if (
    continueMakingRecipes !== null &&
    continueMakingRecipes.includes(recipeId)
  ) {
    const idIndex = continueMakingRecipes.indexOf(recipeId);
    continueMakingRecipes.splice(idIndex, 1);
  } else {
    continueMakingRecipes.push(recipeId);
  }

  localStorage.setItem(
    "continue-making",
    JSON.stringify(continueMakingRecipes)
  );
};
export const AddContinueMaking = (recipeId) => {
  const storedContinue = GetContinueMaking();
  const continueMakingRecipes = [];
  storedContinue?.forEach((id) => {
    continueMakingRecipes.push(id);
  });
  if (!continueMakingRecipes.includes(recipeId.toString())) {
    continueMakingRecipes.push(recipeId);
  }

  localStorage.setItem(
    "continue-making",
    JSON.stringify(continueMakingRecipes)
  );
};
export const RemoveContinueMaking = (recipeId) => {
  const storedContinue = GetContinueMaking();
  const continueMakingRecipes = [];
  storedContinue?.forEach((id) => {
    continueMakingRecipes.push(id);
  });
  if (
    continueMakingRecipes !== null &&
    continueMakingRecipes.includes(recipeId.toString())
  ) {
    const idIndex = continueMakingRecipes.indexOf(recipeId);
    continueMakingRecipes.splice(idIndex, 1);

    //auto removes ingredients
  }

  localStorage.setItem(
    "continue-making",
    JSON.stringify(continueMakingRecipes)
  );
};
