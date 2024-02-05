// Aquire data
async function getData(projectNum, bool = false) {
    // URL of the JSON file
    let dataJsonUrl = "../data.json";

    const request = await fetch(dataJsonUrl);
    const response = await request.json();

    // Access data using the new structure
    const general = response.general;
    const projects = response.projects;
    const socialMedia = response.socialMedia;
    const colors = response.colors;

    const projectKeys = Object.keys(response.projects);
    const projectNumMax = projectKeys.length -1;
    console.log(`Total number of projects: ${projectNumMax}`);


    addMetaDescription(general.metaDescription);

    document.querySelectorAll(".LogoContainer").forEach((e) => {
        e.firstElementChild.src = "img/" + general.logo;
        e.firstElementChild.alt = general.logo;
    });

    document.querySelector(":root").style.setProperty("--mainColor", colors.mainColor);
    document.querySelector(":root").style.setProperty("--secondaryColor", colors.secondaryColor);
    document.querySelector(":root").style.setProperty("--accentColor", colors.accentColor);
    document.querySelector(":root").style.setProperty("--backgroundColor", colors.backgroundColor);

    if (projectNum > projectNumMax) {
        projectNum = 0;
    }

    if (projectNum < 0) {
        projectNum = projectNumMax;
    }

    var url = window.location.href;
    let arrayUrl = url.split("/");

    arrayUrl[arrayUrl.length - 1] = "";

    let newURL = arrayUrl.join("/");

    let param = new URLSearchParams();
    param.append("project", projectNum);

    if (bool == true) {
        window.location.href = `${newURL}portfolio.html?${param}`;
    }

    const project = projects[projectNum];

    addProject(project.title, project.text, project.foto);
    document.title = project.title;

    // Adding Contacts
    addMailNumberContacts(general.email, general.phoneNumber);

    // Adding Parent div for contacts
    addContactDiv();

    let i = 0;
    for (const [key, value] of Object.entries(socialMedia)) {
        i += 1;
        addContact(key.replace("URL", ""), value);
    }

    let contactContainer = document.querySelector(".contactContainer");
    if (i % 3 == 0 || i > 7) {
        contactContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else {
        contactContainer.style.gridTemplateColumns = "1fr 1fr";
    }

    console.log(response);
}

var projectNum = window.location.search.replace("?project=", "");

getData(projectNum);


/**
 * @param {title of the Portfolio} title 
 * @param {text of the Portfolio} text 
 * @param {fotoUrl URL if the image} fotoUrl 
 * @param {num of the Projects} num 
 */

function addProject(title, text, fotoUrl){
    const articlePortfolio = document.querySelector(".subPortfolio");
    
    const htmlString = 
    `
        <div class="headPicture">
            <img src="img/${fotoUrl}"alt="${title}" id="${title.replace(" ", "_").replace("=", "_")}">
        </div>
        <div class="bannerArticle">
            <h1 class="bannerHeadline">
                ${title}
            </h1>

            <!-- Text has to be limited to a certain amout of characters -->
            <p class="bannerText">
                ${text}
            </p>
        </div>
    `;

    const bannerPortfolio = document.createElement("div");

    bannerPortfolio.classList.add("subBannerPortfolio");
    bannerPortfolio.setAttribute("id", title);
    bannerPortfolio.innerHTML = htmlString;


    articlePortfolio.appendChild(bannerPortfolio);
}


/**
 * @param {title => means name of the brand as String} title 
 * @param {link regarding the contact connection} link 
 */

function addContact(title, link){
    const contactContainer = document.querySelector(".contactContainer");
    
    const htmlString = 
    `
        <a class="contactAnker" href="${link}">
            <img class="contactIMG" src="img/${title}.png" alt="${title}"> 
        </a>
        <span class="contactSpan"> ${title} </span>
    `;

    const contactDiv = document.createElement("div");

    contactDiv.classList.add("contact");
    contactDiv.setAttribute("id", title);
    contactDiv.innerHTML = htmlString;

    contactContainer.appendChild(contactDiv);
}

function addContactDiv(){
    let contactDiv = document.createElement("div");
    contactDiv.classList.add("contactContainer");

    document.querySelector(".articleContact").appendChild(contactDiv)
}

/**
 * @param {email of the client} email 
 * @param {number of the client} number 
 */

function addMailNumberContacts(email, number){
    const articleContact = document.querySelector(".articleContact");
    
    const htmlString = 
    `
        <a class="contactEmail" href="mailto: ${email}">
            email: ${email}
        </a>
        <a class="contactPhone" href="tel: ${number}">
            phonenumber: ${number}
        </a>
    `;

    const contactDiv = document.createElement("div");

    contactDiv.classList.add("mailNphone");
    contactDiv.innerHTML = htmlString;

    articleContact.appendChild(contactDiv);
}


function addMetaDescription(desc){
    document.querySelector('meta[name="description"]').setAttribute("content", desc);
}
