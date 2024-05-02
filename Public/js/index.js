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

const messageSection = document.getElementById("messages");
messageSection.hidden = true;

// to remove submitted message from Messages section
function onRemoveButton(event) {
    console.log("on Remove");
    const entry = event.target.parentNode;
    entry.remove();

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.getElementsByTagName("li");
    console.log(messageList);
    console.log(messageList.length);
    if (messageList.length === 0) {
        messageSection.hidden = true;
        messageSection.style.display = 'none';
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// to submit the message form
function onFormSubmit(event){
    event.preventDefault();

    // const data = new FormData(event.target);
    // const usersName = data.get("usersName");
    // const email = data.get("email");
    // const usersMessage = data.get("usersMessage");

    const usersName = event.target.usersName.value;
    const email = event.target.email.value;
    const usersMessage = event.target.usersMessage.value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    console.log("Name: ", usersName);
    console.log("Email: ", email);
    console.log("Message: ", usersMessage);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    console.log("messageList: ", messageList);

    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
            <a href="mailto:${email}">${usersName}<strong>:</strong></a>\n 
            <span>${usersMessage}</span>
        `;

    messageSection.hidden = false;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";
    removeButton.id = "remove-button";
    removeButton.addEventListener("click", onRemoveButton);
    console.log("removeButton: ", removeButton);

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();
}

const messageForms = document.getElementsByName("leave_message")
console.log("messageForms: ", messageForms);
if (messageForms.length > 0) {
    const messageForm = messageForms[0];
    console.log("messageForm: ", messageForm);
    messageForm.addEventListener("submit", onFormSubmit);
}
