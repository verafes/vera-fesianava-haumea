// footer copyright info
const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement("footer");
const copyright = document.createElement("p");
copyright.classList.add("footer-credit");
copyright.innerHTML = `<small>Vera Fesianava &copy; ${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);

//Filling the Skills section:
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

// Leave Message form submit section
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
function onFormSubmit(event) {
    event.preventDefault();

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

    // Remove button
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

// Projects list handling
const username = "verafes";
const url = `https://api.github.com/users/${username}/repos`;
const projectSection = document.getElementById('projects');

function fetchData() {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }
            return res.json()
        })
        .then(data => {
            // sorting projects in the list
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            // creating projects list
            let projectList = projectSection.querySelector('ul');
            if (!projectList) {
                projectList = document.createElement('ul');
                projectList.className = 'projects-list';
                projectSection.appendChild(projectList);
            }

            data.forEach(repo => {
                //skipping forked projects except one
                if (repo.fork && repo.name !== 'luma_project') {
                    return;
                }
                const project = document.createElement('li');
                const projectLink = document.createElement('a');
                const projectDesc = document.createElement('p');

                projectLink.href = repo.html_url;
                projectLink.target = '_blank';
                projectLink.textContent = repo.name;
                project.classList.add('info');
                projectDesc.textContent = `${repo.description}`;

                const date = new Date(repo.created_at);
                const options = {year: 'numeric', month: 'short', day: 'numeric'};
                const dateString = date.toLocaleDateString('en-US', options);

                projectDesc.textContent += ` | ${dateString}`;
                project.appendChild(projectLink);
                projectList.appendChild(project);
                project.appendChild(projectDesc);
            });
            console.log(projectList);
        })
        .catch(error => {
            console.error('Error fetching repositories:', error.message);
            // Displaying error message to the user
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Failed to fetch repositories. Please try again later.';
            errorMessage.classList.add('error-message');
            projectSection.appendChild(errorMessage);
        });
}

fetchData();

// Connect section
// to add mail link
const mailLink = document.querySelector('.social-link:last-child a');

mailLink.addEventListener('click', () => {
    mailLink.href = `mailto:${username}@gmail.com`;
});

// to insert username to social links
const lnUsername = "vera-fesianava/";
const socialLinks = document.querySelectorAll('.social-link a');

socialLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        let targetHref = link.href;
        if (targetHref.endsWith("linkedin.com/in/")) {
            targetHref += lnUsername;
        } else if (targetHref.endsWith("github.com/")) {
            targetHref += username;
        }
        window.open(targetHref, '_blank');
    });
});
