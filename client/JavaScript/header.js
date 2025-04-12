const headerElement = document.getElementById("header");
// headerElement.classList = "mobile-hidden"
const logoAndTitleContainerElement = document.createElement("div");
const logoElement = document.createElement("img");
logoElement.src = "/images/logo.png";
logoElement.alt = "Ms. Hubbard's Cupboard";
const titleElement = document.createElement("h1");
titleElement.textContent = "Ms Hubbard's Cupboard";
const navElement = document.createElement("nav");
navElement.classList = "mobile-hidden"
const link1Element = document.createElement("a");
link1Element.textContent = "Home";
link1Element.href = "./html/index.html";
const link2Element = document.createElement("a");
link2Element.textContent = "Pantry";
link2Element.href = "./html/pantry.html";
const link3Element = document.createElement("a");
link3Element.textContent = "Add a Recipe";
link3Element.href = "./html/addRecipe.html"

navElement.appendChild(link1Element);
navElement.appendChild(link2Element);
navElement.appendChild(link3Element);
logoAndTitleContainerElement.appendChild(logoElement);
logoAndTitleContainerElement.appendChild(titleElement);
headerElement.appendChild(logoAndTitleContainerElement);
headerElement.appendChild(navElement);
