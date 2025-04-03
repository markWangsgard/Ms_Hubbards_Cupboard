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
/*
export const SendRecipe = async (recipe, photo) => {
  const json = JSON.stringify(recipe);
  const formData = new FormData();
  // formData.append("recipe", json);
  formData.append("photo", photo);
  const response = await fetch(`${url}/newRecipe/${json}`, {
    body: formData,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
} */

export const SendRecipe = async (recipe, photo) => {
  const json = JSON.stringify(recipe);
  const response = await fetch(`${url}/newRecipe`, {
    body: json,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const newRecipeID = await GetRecipeId(recipe.title);
  console.log(newRecipeID);
  await SendPhoto(photo, newRecipeID);
}
export const SendPhoto = async (photo, id) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await fetch(`${url}/newRecipe/photo/${id}`, {
    method: "POST",
    body: formData,
  });
};

export const GetPhoto = async (path) => {
  const response = await fetch(`${url}/photo/${path}`);
  const object = await response.blob();
  const objectURL = URL.createObjectURL(object);
  console.log(objectURL);
  // return object;
}