const headerElement = document.getElementById("header");
const logoElement = document.createElement("img");
logoElement.src = "/images/logo.png";
logoElement.alt = "Ms. Hubbard's Cupboard";
const titleElement = document.createElement("h1");
titleElement.textContent = "Ms Hubbard's Cupboard";
headerElement.appendChild(logoElement);
headerElement.appendChild(titleElement);
