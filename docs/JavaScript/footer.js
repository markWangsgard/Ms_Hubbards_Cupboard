const footerElement = document.getElementById("footer");
footerElement.classList = "mobile-visible"

const navElement = document.createElement("nav");
const link1Element = document.createElement("a");
link1Element.href = "http://127.0.0.1:5500/html/home.html";
const link1ImgElement = document.createElement("img");
link1ImgElement.classList = "large-icon";
link1ImgElement.src = "./images/home-icon.svg";
link1ImgElement.alt = "Home";
const link1TextElement = document.createElement("p");
link1TextElement.textContent = "Home";

const link2Element = document.createElement("a");
link2Element.href = "http://127.0.0.1:5500/html/pantry.html";
const link2ImgElement = document.createElement("img");
link2ImgElement.classList = "large-icon";
link2ImgElement.src = "./images/pantry-icon.svg";
link2ImgElement.alt = "Pantry";
const link2TextElement = document.createElement("p");
link2TextElement.textContent = "Pantry";

const link3Element = document.createElement("a");
link3Element.href = "http://127.0.0.1:5500/html/addRecipe.html"
const link3ImgElement = document.createElement("img");
link3ImgElement.classList = "large-icon";
link3ImgElement.src = "./images/add-recipe-icon.svg";
link3ImgElement.alt = "Add Recipe";
const link3TextElement = document.createElement("p");
link3TextElement.textContent = "Add Recipe";

link1Element.appendChild(link1ImgElement);
link1Element.appendChild(link1TextElement);
link2Element.appendChild(link2ImgElement);
link2Element.appendChild(link2TextElement);
link3Element.appendChild(link3ImgElement);
link3Element.appendChild(link3TextElement);
navElement.appendChild(link1Element);
navElement.appendChild(link2Element);
navElement.appendChild(link3Element);
footerElement.appendChild(navElement);