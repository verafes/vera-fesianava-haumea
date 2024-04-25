const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement("footer");
const copyright = document.createElement("p");
copyright.classList.add("footer-credit");
copyright.innerHTML = `<small>Vera Fesianava &copy; ${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);

let skills = [
    "Java Script", "HTML", "CSS", "Postman", "Rest API", "Python",
    "Pytest", "Playwright", "Selenium", "MySQL", "Git/GitHub", "Adobe Suite"
];
let skillsSection = document.getElementById("skills");
let skillsList = document.createElement("ul");
skillsList.classList.add("skills-list");
skillsSection.appendChild(skillsList);

for (let skill of skills) {
    let skillItem = document.createElement("li");
    skillItem.classList.add("info");
    skillItem.innerText = skill;
    skillsList.appendChild(skillItem);
}
