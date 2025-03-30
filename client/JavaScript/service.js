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
}