const url = "http://localhost:5032";

export const getAllRecipes = async () => {
  const response = await fetch(`${url}/recipes`);
  const objects = await response.json();
  return objects;
};
