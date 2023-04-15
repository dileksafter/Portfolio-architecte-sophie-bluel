//on declare la fonction de recuperation des travaux dans le swagger
async function getProjects() {
    const projects = await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(projects => Array.from(new Set(projects))) //verification et elimination des eventuels duplicats de travaux, creation dun array a partir de objet set
    return projects
}

//on declare la fonction qui ajoute les travaux au html
function addElements(projects) {

    const gallery = document.querySelector("#portfolio > .gallery");

    //creation d'une boucle for pour cibler chaque element du tableau
    for (let i = 0; i < projects.length; i++) {

        //creation d'elements dans la gallerie en html
        const newFigure = document.createElement("figure");

        const newImage = document.createElement("img");

        const newCaption = document.createElement("figcaption");

        //on accede a l'indice i des travaux recuperés pour configurer les parametres de l'image
        newImage.setAttribute("src", projects[i].imageUrl)
        newImage.setAttribute("alt", projects[i].title)

        //on rattache titre au contenu texte
        newCaption.append(projects[i].title)

        //on rattache la figure a la gallerie
        gallery.appendChild(newFigure)

        //on rattache la image et le titre a la figure
        newFigure.appendChild(newImage)
        newFigure.appendChild(newCaption)


        newFigure.setAttribute("id", "work" + projects[i].id)
    }
}

//on declare la fonction qui filtre des elements de la gallerie
function filterElements(projects) {

    //cible les boutons filtres crees en html 
    const buttonTous = document.querySelector(".button-tous");

    const buttonObjets = document.querySelector(".button-objets");

    const buttonAppartements = document.querySelector(".button-appartements");

    const buttonHôtelsetrestaurants = document.querySelector(".button-hôtelsetrestaurants");

    //on cible la gallerie pour l'etape suivante
    const gallery = document.querySelector("#portfolio > .gallery")

    //On ajoute un eventlistener qui appelle la fonction au click sur le bouton cible
    buttonTous.addEventListener("click", function () {
        //on vide le contenu de la gallerie au click grace a innerHTML
        gallery.innerHTML = ""
        addElements(projects) //on appelle la fonction qui ajoute les elements a lecran 
    })

    //On ajoute un eventlistener qui appelle la fonction au click sur le bouton cible
    buttonObjets.addEventListener("click", function () {
        //on vide le contenu de la gallerie au click grace a innerHTML
        gallery.innerHTML = ""

        //on creait la constante filter qui retourne tous les elements de projects name = Objets qui correspond a Objets 
        const filtreObjet = projects.filter(function (project) {
            return project.category.name == "Objets";
        });
        addElements(filtreObjet) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })

    //On ajoute un eventlistener qui appelle la fonction au click sur le bouton cible
    buttonAppartements.addEventListener("click", function () {
        //on vide le contenu de la gallerie au click grace a innerHTML
        gallery.innerHTML = ""

        //on creait la constante filter qui retourne tous les elements de projects name = Appartements qui correspond a Appartements 
        const filtreAppartements = projects.filter(function (project) {
            return project.category.name == "Appartements";
        });
        addElements(filtreAppartements) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })

    //On ajoute un eventlistener qui appelle la fonction au click sur le bouton cible
    buttonHôtelsetrestaurants.addEventListener("click", function () {
        //on vide le contenu de la gallerie au click grace a innerHTML
        gallery.innerHTML = ""

        //on creait la constante filter qui retourne tous les elements de projects name = Hotels & restaurants qui correspond a Hôtelsetrestaurants 
        const filtreHôtelsetrestaurants = projects.filter(function (project) {
            return project.category.name == "Hotels & restaurants";
        });
        addElements(filtreHôtelsetrestaurants) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })
}

//on declare la fonction qui verifie le stockage du token ou non 
function verification() {
    if (window.localStorage.getItem("token")) {
        return true
    }
    else {
        return false
    }
}

//on declare la fonction qui affiche la barre d'edition a la connection avec succes
async function editPage() {

    //creation de editbar
    const logoutButton = document.querySelector("#loginbutton")
    logoutButton.textContent = "Logout";

    const editBar = document.querySelector("#editbar");

    const editBarDiv = document.createElement("div");

    editBar.appendChild(editBarDiv)


    //creation du boutton edition rattaché a editbar
    const editButton = document.createElement("button");

    editButton.setAttribute("id", "modeedition")

    editButton.append("Mode édition")


    //creation du logo edition
    const editIcon = document.createElement("i")

    editIcon.setAttribute("class", "fa-solid fa-pen-to-square")


    //creation du boutton publier les changements 
    const publishChangesButton = document.createElement("button");

    publishChangesButton.setAttribute("id", "publish")

    publishChangesButton.append("publier les changements")


    //rattachement de l'icone a editbutton et de editbutton + publishbutton a editbar
    editButton.appendChild(editIcon)

    editBarDiv.appendChild(editButton)

    editBarDiv.appendChild(publishChangesButton)


    //creation du bouton modifier profil
    const editProfil = document.querySelector("#editprofil");

    const editProfilButton = document.createElement("button");

    editProfilButton.append("Modifier")

    editProfil.appendChild(editProfilButton)


    //clone l'icone car elle ne peut etre utilisé qu'1 fois
    editProfil.appendChild(editIcon.cloneNode(true))


    //ceration du boutton modifier projet 
    const editProjects = document.querySelector("#editprojects");

    const editProjectsButton = document.createElement("button");

    //on cible le lien qui ouvre la modale
    editProjectsButton.setAttribute("href", "#modaleditgallery")
    editProjectsButton.setAttribute("id", "modalbutton")

    editProjectsButton.append("Modifier")

    editProjects.appendChild(editProjectsButton)

    editProjects.appendChild(editIcon.cloneNode(true))

    //on vide le local storage a la deconnection  
    logoutButton.addEventListener("click", function () {
        window.localStorage.removeItem("token")
    })

}

function modalManagement() {
    const stopPropagation = function (event) {
        event.stopPropagation()
    }

    const openModal = function (event) {
        event.preventDefault()
        const target = document.querySelector("#modaleditgallery")
        target.style = null
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria-modal", true)
        modal = target
        modal.addEventListener("click", closeModal)
        modal.querySelector(".closemodal").addEventListener("click", closeModal)
        modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation)

    }

    const closeModal = function (event) {
        event.preventDefault()
        if (modal === null) return

        modal.style = "display:none"
        modal.setAttribute("aria-hidden", true)
        modal.removeAttribute("aria-modal")
        modal.removeEventListener("click", closeModal)
        modal.querySelector(".closemodal").removeEventListener("click", closeModal)
        modal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation)
        modal = null
    }


    let modal = null
    document.querySelector("#modalbutton").addEventListener("click", openModal)

}

function populateModal(projects) {

    const closeDiv = document.createElement("div");

    closeDiv.setAttribute("class", "close-icon")


    const closeIcon = document.createElement("i")

    closeIcon.setAttribute("class", "closemodal fa-solid fa-x")

    closeDiv.appendChild(closeIcon)


    const modalTitle = document.createElement("h1")

    modalTitle.setAttribute("class", "modaltitle")

    modalTitle.append("Galerie photo")

    const modalGallery = document.createElement("div")

    modalGallery.setAttribute("class", "modalgallery")


    const modalWrapper = document.querySelector(".modal-wrapper")


    const line = document.createElement("div");

    line.setAttribute("class", "line")


    const addProject = document.createElement("button");

    addProject.setAttribute("id", "addProject")

    addProject.append("Ajouter une photo")


    const deleteGallery = document.createElement("button");

    deleteGallery.setAttribute("id", "deleteGallery")

    deleteGallery.append("Supprimer la galerie")


    const modalOptions = document.createElement("div")

    modalOptions.setAttribute("class", "options")

    modalOptions.appendChild(line)
    modalOptions.appendChild(addProject)
    modalOptions.appendChild(deleteGallery)

    modalWrapper.appendChild(closeDiv)
    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(modalGallery)
    modalWrapper.appendChild(modalOptions)

    const gallery = document.querySelector(".modalgallery");

    //creation d'une boucle for pour cibler chaque element du tableau
    for (let i = 0; i < projects.length; i++) {

        //creation d'elements dans la gallerie en html
        const newFigure = document.createElement("figure");

        const newImage = document.createElement("img");

        const buttonEditer = document.createElement("button");

        //on accede a l'indice i des travaux recuperés pour configurer les parametres de l'image
        newImage.setAttribute("src", projects[i].imageUrl)
        newImage.setAttribute("alt", projects[i].title)

        //on rattache titre au contenu texte
        buttonEditer.append("éditer")

        //on rattache la figure a la gallerie
        gallery.appendChild(newFigure)

        if (i === 0) {

            const multiArrowsIcon = document.createElement("i")

            multiArrowsIcon.setAttribute("class", "fa-solid fa-arrows-up-down-left-right")

            const multiArrowsButton = document.createElement("button")

            multiArrowsButton.setAttribute("id", "multiArrowsButton")

            multiArrowsButton.appendChild(multiArrowsIcon)
            newFigure.appendChild(multiArrowsButton)
        }

        const trashIcon = document.createElement("i")

        trashIcon.setAttribute("class", "fa-solid fa-trash-can")


        const trashButton = document.createElement("button")

        trashButton.setAttribute("id", "trashButton")

        trashButton.appendChild(trashIcon)
        newFigure.appendChild(trashButton)

        //on rattache la image et le titre a la figure
        newFigure.appendChild(newImage)

        newFigure.appendChild(buttonEditer)
        newFigure.setAttribute("id", "work" + projects[i].id)

    }
}

async function deleteWorks() {

    const trashButtons = document.querySelectorAll("#trashButton")


    for (let i = 0; i < trashButtons.length; i++) {
        trashButtons[i].addEventListener("click", async function () {

            const userConfirmed = confirm('Êtes-vous sûr(e) de vouloir effectuer cette suppression ?');

            if (userConfirmed) {

                const figureId = trashButtons[i].parentElement.getAttribute("id")

                const gallery = document.querySelector(".gallery")

                const response = await fetch("http://localhost:5678/api/works/" + figureId.replace("work", ""), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                })

                if (response.status === 200) {

                    trashButtons[i].parentElement.remove() //remove from modal 

                    gallery.querySelector("#" + figureId).remove() //remove from galery


                }

                if (response.status == 401) {
                    alert("La requête n'a pas été appliquée car il manque des informations d'authentification")
                }
                if (response.status == 500) {
                    alert("Le serveur a rencontré un problème inattendu")
                }
            }



        })
    }

}

function addWorks() {

    document.querySelector("#addProject").addEventListener("click", function (event) {

        // reset modal
        event.preventDefault()

        const modalWrapper = document.querySelector(".modal-wrapper")

        modalWrapper.innerHTML = ""

        // setup modal

        const closeDiv = document.createElement("div");

        closeDiv.setAttribute("class", "close-icon")

        const closeIcon = document.createElement("i")

        closeIcon.setAttribute("class", "closemodal fa-solid fa-x")

        closeDiv.appendChild(closeIcon)

        const arrowDiv = document.createElement("div");

        arrowDiv.setAttribute("class", "arrow-icon")

        const arrowIcon = document.createElement("i")

        arrowIcon.setAttribute("class", "returnback fa-solid fa-arrow-left")

        arrowDiv.appendChild(arrowIcon)

        const iconsDiv = document.createElement("div")

        iconsDiv.setAttribute("id", "iconsDiv")

        const modalTitle = document.createElement("h1")

        modalTitle.setAttribute("class", "modaltitle")

        modalTitle.append("Ajout photo")


        // setup form


        const addWorkForm = document.createElement("form")

        addWorkForm.setAttribute("id", "submitwork")
        // addWorkForm.setAttribute("action", "#")
        // addWorkForm.setAttribute("method", "post")   


        const addImageWrapper = document.createElement("div")
        addImageWrapper.setAttribute("id", "imagewrapper")

        const labelImage = document.createElement("label")
        labelImage.setAttribute("for", "image")

        const iconLabel = document.createElement("i")

        iconLabel.setAttribute("class", "fa-regular fa-image")


        labelImage.appendChild(iconLabel)

        const buttonLabel = document.createElement("div")

        buttonLabel.setAttribute("id", "buttonlabel")

        buttonLabel.append("+ Ajouter photo")

        labelImage.appendChild(buttonLabel)

        const paragraphLabel = document.createElement("p")

        paragraphLabel.append("jpg, png : 4mo max")

        labelImage.appendChild(paragraphLabel)

        const inputImage = document.createElement("input")

        inputImage.setAttribute("id", "image")

        inputImage.setAttribute("type", "file")

        inputImage.setAttribute("name", "image")

        inputImage.setAttribute("accept", "image/*")

        inputImage.setAttribute("style", "display:none;")

        addImageWrapper.appendChild(labelImage)
        addImageWrapper.appendChild(inputImage)



        //--------------------------------------------------


        const labelTitle = document.createElement("label")

        labelTitle.setAttribute("for", "title")

        labelTitle.append("Titre")

        const inputTitle = document.createElement("input")

        inputTitle.setAttribute("type", "text")

        inputTitle.setAttribute("name", "title")

        inputTitle.setAttribute("id", "title")


        const labelCategory = document.createElement("label")

        labelCategory.setAttribute("for", "category")

        labelCategory.append("Catégorie")

        const selectCategory = document.createElement("select")

        selectCategory.setAttribute("name", "category")

        selectCategory.setAttribute("id", "category")


        const defaultValue = document.createElement("option")

        defaultValue.setAttribute("value", "")

        selectCategory.appendChild(defaultValue)


        const optionObjets = document.createElement("option")

        optionObjets.setAttribute("value", "1")

        optionObjets.append("Objets")

        selectCategory.appendChild(optionObjets)


        const optionAppartements = document.createElement("option")

        optionAppartements.setAttribute("value", "2")

        optionAppartements.append("Appartements")

        selectCategory.appendChild(optionAppartements)


        const optionHotelsEtRestaurants = document.createElement("option")

        optionHotelsEtRestaurants.setAttribute("value", "3")

        optionHotelsEtRestaurants.append("Hôtels & restaurants")

        selectCategory.appendChild(optionHotelsEtRestaurants)


        const secondModalline = document.createElement("div");

        secondModalline.setAttribute("class", "secondmodalline")


        const submitProject = document.createElement("input");

        submitProject.setAttribute("id", "submitproject")

        submitProject.setAttribute("type", "submit")

        submitProject.setAttribute("value", "Valider")


        const addWorkWrapper = document.createElement("div")

        addWorkWrapper.setAttribute("id", "addworkwrapper")




        addWorkForm.appendChild(addImageWrapper)
        addWorkForm.appendChild(labelTitle)
        addWorkForm.appendChild(inputTitle)
        addWorkForm.appendChild(labelCategory)
        addWorkForm.appendChild(selectCategory)
        addWorkForm.appendChild(secondModalline)
        addWorkForm.appendChild(submitProject)


        iconsDiv.appendChild(arrowDiv)
        iconsDiv.appendChild(closeDiv)

        modalWrapper.appendChild(iconsDiv)
        addWorkWrapper.appendChild(modalTitle)
        addWorkWrapper.appendChild(addWorkForm)

        modalWrapper.appendChild(addWorkWrapper)

        inputImage.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                labelImage.innerHTML = ''

                const thumbnail = document.createElement('img');
                thumbnail.src = e.target.result;
                thumbnail.width = 129; 
                thumbnail.height = 169; 
                labelImage.appendChild(thumbnail); 
              };
              reader.readAsDataURL(file);
            }
          });


        function updateSubmitButton() {
            if (inputImage.files.length > 0 && inputTitle.value !== '' && selectCategory.value !== '') {

                submitProject.style.backgroundColor = '#1D6154'; // Change the background color to green when the form is fully filled
                // submitProject.disabled = false;
            }

            else {
                submitProject.style.backgroundColor = '#A7A7A7'; // keeps the background color to gray when the form is not fully filled
                // submitProject.disabled = true;
            }

        }

        inputImage.addEventListener('change', updateSubmitButton);
        inputTitle.addEventListener('input', updateSubmitButton);
        selectCategory.addEventListener('change', updateSubmitButton);

        updateSubmitButton();


        //fermeture de la 2nde modale avec la croix
        document.querySelector(".closemodal").addEventListener("click", async function (event) {
            event.preventDefault()

            let modal = document.querySelector("#modaleditgallery")

            modal.style = "display:none"
            modal.setAttribute("aria-hidden", true)
            modal.removeAttribute("aria-modal")
        })

        const form = document.querySelector("#submitwork")
        form.addEventListener("submit", async function (event) {

            event.preventDefault()

            const formData = new FormData(form)
            await uploadWork(formData)

        })

    })

}


async function uploadWork(formData) {

    const response = await fetch("http://localhost:5678/api/works", {
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`, //pour faire apparaitre msgs d'erreur 
            // Authorization: "test"
        },
        method: 'POST',
        body: formData
    })

    if (response.status === 400) {
        alert("Informations insuffisantes")
    }

    if (response.status === 401) {
        alert("La requête n'a pas été appliquée car il manque des informations d'authentification")
    }

    if (response.status === 500) {
        alert("Le serveur a rencontré un problème inattendu")
    }

}



//on declare la fonction qui affiche tous les travaux quand la page se charge  
async function initialize() {

    let projects = await getProjects()

    const verified = verification()

    if (verified) {
        editPage()
        modalManagement()
        populateModal(projects)
        await deleteWorks()
        addWorks()

    }

    addElements(projects) // la fonction initialize inclu l'appel a la fonction ajout d'elements a la gallerie 

    filterElements(projects) // la fonction initialize inclu l'appel a la fonction filtre les elements

}

initialize() //on appelle la fonction qui ajoutent les elements a la gallerie + qui les filtre grace aux boutons 

