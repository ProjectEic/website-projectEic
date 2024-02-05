// Aquire data
async function getData() {
    try {
        // Url Json file
        let dataJsonUrl = "../data.json";

        const response = await fetch(dataJsonUrl);
        const data = await response.json();

        // addMetaDescription(data.general.metaDescription);
        document.title = data.general.title;
        document.querySelector(".aboutName").innerHTML = data.general.title;
        document.querySelector(".aboutText").innerHTML = data.general.aboutText;
        document.querySelector(".aboutFoto").firstElementChild.src = "img/" + data.general.aboutFoto;
        document.querySelector(".aboutFoto").firstElementChild.alt = data.general.aboutFoto;
        document.querySelector(".LogoContainer").firstElementChild.src = "img/" + data.general.logo;
        document.querySelector(".LogoContainer").firstElementChild.alt = data.general.logo;

        document.querySelector(":root").style.setProperty("--mainColor", data.colors.mainColor);
        document.querySelector(":root").style.setProperty("--secondaryColor", data.colors.secondaryColor);
        document.querySelector(":root").style.setProperty("--accentColor", data.colors.accentColor);
        document.querySelector(":root").style.setProperty("--backgroundColor", data.colors.backgroundColor);

        // Adding Projects
        for (const key in data.projects) {
            if (data.projects.hasOwnProperty(key)) {
                const project = data.projects[key];
                addProject(project.title, project.text, project.foto, key);
            }
        }

        // Adding Services
        for (const key in data.services) {
            if (data.services.hasOwnProperty(key)) {
                const service = data.services[key];
                addServices(service.title, service.text, service.foto);
            }
        }

        // Adding Clients
        for (const key in data.customers) {
            if (data.customers.hasOwnProperty(key)) {
                const client = data.customers[key];
                addClients(client.title, client.foto);
            }
        }

        // Adding Contacts
        addMailNumberContacts(data.general.email, data.general.phoneNumber);

        // Adding Parent div for contacts
        addContactDiv();

        let i = 0;
        for (const [key, value] of Object.entries(data.socialMedia)) {
            i += 1;
            addContact(key.replace("URL", ""), value);
        }

        let contactContainer = document.querySelector(".contactContainer");
        if (i % 3 == 0 || i > 7) {
            contactContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
        } else {
            contactContainer.style.gridTemplateColumns = "1fr 1fr";
        }

        const faders = document.querySelectorAll(".fadeIn");
        startObserver(faders);
    } catch (error) {
        console.error("Error fetching and populating data:", error);
    }
}

getData();




function addMetaDescription(desc){
    document.querySelector('meta[name="description"]').setAttribute("content", desc);
}


/**
 * @param {title => means name of the brand as String} title 
 * @param {link regarding the contact connection} link 
 */

function addContact(title, link){
    const contactContainer = document.querySelector(".contactContainer");
    
    //html prefab
    const htmlString = 
    `
        <a class="contactAnker" href="${link}">
            <img class="contactIMG" src="img/${title}.png" alt="${title}"> 
        </a>
        <span class="contactSpan"> ${title} </span>
    `;

    const contactDiv = document.createElement("div");

    contactDiv.classList.add("contact");
    contactDiv.classList.add("fadeIn");
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
 * @param {title of the Portfolio} title 
 * @param {text of the Portfolio} text 
 * @param {fotoUrl URL if the image} fotoUrl 
 * @param {num of the Projects} num 
 */

function addProject(title, text, fotoUrl, num){
    const articlePortfolio = document.querySelector(".articlePortfolio");
    
    if(text.length > 150){
       text = text.slice(0,147);
       text += "...";
       console.log(text)
   }

    //html prefab
    const htmlString = 
    `
        <div class="headPicture">
            <img src="img/${fotoUrl}" alt="${title}" id="${title.replace(" ", "_").replace("=", "_")}">
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

    bannerPortfolio.classList.add("bannerPortfolio");
    bannerPortfolio.classList.add("fadeIn");
    bannerPortfolio.classList.add("left");
    bannerPortfolio.setAttribute("id", title);
    bannerPortfolio.innerHTML = htmlString;

    // adding click event
    // logic to open the project in a new .html - file
    bannerPortfolio.addEventListener("click", () =>{

        var url = window.location.href;
        let arrayUrl = url.split("/");

        // "deleting" last element
        arrayUrl[arrayUrl.length-1] = "";

        let newURL = arrayUrl.join("/")

        let param = new URLSearchParams();
        param.append("project", num);

        // redirecting to portfolio.html with the choosen content 
        window.location.href =  `${newURL}portfolio.html?${param}`; 

    });

    articlePortfolio.appendChild(bannerPortfolio);
}


/**
 * @param {title of the Service} title 
 * @param {text of the Service} text 
 */

function addServices(title, text, fotoUrl){
    const articleServices = document.querySelector(".articleServices");
    

    // html prefab
    const htmlString = 
    `
        <div class="servicePicture fadeIn left">
            <img src="img/${fotoUrl}" alt="${title}" id="${title}">
        </div>
        <div class="serviceArticle fadeIn right">
            <h1 class="serviceHeadline">
                ${title}
            </h1>

            <!-- Text has to be limited to a certain amout of characters -->
            <p class="serviceText">
                ${text}
            </p>
        </div>
    `;

    const service = document.createElement("div");

    service.classList.add("service");
    service.setAttribute("id", title);
    service.innerHTML = htmlString;

    articleServices.appendChild(service);
}


/**
 * @param {name of the client} name 
 * @param {fotoUrl of the client} fotoUrl 
 */ 
function addClients(name, fotoUrl){
    const articleClients = document.querySelector(".articleClients");
    
    // html prefab
    const htmlString = 
    `
        <div class="clientPicture">
            <img src="img/${fotoUrl}" alt="${name} Picture">
        </div>
        <div class="clientName">
             <h1 class="clientHeadline">
            ${name}
            </h1>
        </div>
    `;

    const client = document.createElement("div");

    client.classList.add("client");
    client.classList.add("fadeIn");
    client.classList.add("right");
    
    client.setAttribute("id", name);
    client.innerHTML = htmlString;

    articleClients.appendChild(client);
}


/**
 * @param {email of the client} email 
 * @param {number of the client} number 
 */

function addMailNumberContacts(email, number){
    const articleContact = document.querySelector(".articleContact");
    
    // html prefab
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
    contactDiv.classList.add("fadeIn");
    contactDiv.innerHTML = htmlString;

    articleContact.appendChild(contactDiv);
}
