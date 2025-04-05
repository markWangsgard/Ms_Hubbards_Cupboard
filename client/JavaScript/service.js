const url = "http://localhost:5032";

export const getAllRecipes = async () => {
  const response = await fetch(`${url}/recipes`);
  const objects = await response.json();
  return objects;
};
export const getRecipe = async (id) => {
  const response = await fetch(`${url}/recipes/${id}`);
  const object = await response.json();
  return object;
};
export const GetRecipeId = async (title) => {
  const fetchURl = `${url}/recipes/id?title=${title}`;
  const response = await fetch(`${url}/recipes/id?title=${title}`);
  const object = await response.json();
  return object;
};
export const sendRating = async (rating, id) => {
  const response = await fetch(`${url}/rating/${id}/${rating}`, {
    body: JSON.stringify(rating),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

  export const uploadRecipe = async (recipe, photo) => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("recipeJSON", JSON.stringify(recipe));
    const response = await fetch(`${url}/newRecipe/upload`, {
      body: formData,
      method: "POST"
    });
  };
  export const UploadRecipeAndReciveId = async (recipe, photo) => {
    await uploadRecipe(recipe, photo);
    return await GetRecipeId(recipe.title);
  }

export const SendPhoto = async (photo, id) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await fetch(`${url}/newRecipe/photo/${id}`, {
    method: "POST",
    body: formData,
  });
};

export const GetPhotoURL = async (id) => {
  const recipe = await getRecipe(id);
  return `${url}/photo/${recipe.photoURL}`;
}