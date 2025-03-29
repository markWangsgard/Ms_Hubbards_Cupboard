const url = "http://localhost:5032";

export const getAllRecipes = async () => {
  const response = await fetch(`${url}/recipes`);
  const objects = await response.json();
  return objects;
  objects.Map((recipe) => {
    let DifficultyRating;
    switch (recipe.difficulty) {
      case 1:
        DifficultyRating = "Easy";
        break;
      case 2:
        DifficultyRating = "Standard";
        break;
      case 3:
        DifficultyRating = "Medium";
        break;
      case 4:
        DifficultyRating = "Intermediate";
        break;
      case 5:
        DifficultyRating = "Hard";
        break;
    }
    const newRecipe = {
        ...recipe,
        difficultyRating: DifficultyRating
    }
    return newRecipe;
  });
};
