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

function verification() {
    if (window.localStorage.getItem("token")) {
        return true
    }
    else {
        return false
    }
}

async function editPage() {

    const logoutButton = document.querySelector("#loginbutton")
    logoutButton.textContent = "Logout";

    const editBar = document.querySelector("#editbar");






    const editButton = document.createElement("button");

    editButton.setAttribute("id", "modeedition")

    editButton.append("Mode édition")





    const editIcon = document.createElement("i")

    editIcon.setAttribute("class", "fa-solid fa-pen-to-square")
    
   



    const publishChangesButton = document.createElement("button");

    publishChangesButton.setAttribute("id", "publish")

    publishChangesButton.append("publier les changements")



    
    editButton.appendChild(editIcon)

    editBar.appendChild(editButton)
    
    editBar.appendChild(publishChangesButton)




    const editProfil = document.querySelector("#editprofil");

    const editProfilButton = document.createElement("button");

    editProfilButton.append("Modifier")

    editProfil.appendChild(editProfilButton)

    editProfil.appendChild(editIcon.cloneNode(true))

  



    const editProjects = document.querySelector("#editprojects");

    const editProjectsButton = document.createElement("button");

    editProjectsButton.append("Modifier")

    editProjects.appendChild(editProjectsButton)

    editProjects.appendChild(editIcon.cloneNode(true))

   




//on vide le local storage a la deconnection  
    logoutButton.addEventListener ("click", function(){
        window.localStorage.removeItem ("token")
    })

}

//on declare la fonction qui affiche tous les travaux quand la page se charge  
async function initialize() {

    const projects = await getProjects()

    addElements(projects) // la fonction initialize inclu l'appel a la fonction ajout d'elements a la gallerie 

    filterElements(projects) // la fonction initialize inclu l'appel a la fonction filtre les elements

    const verified = verification()

    if (verified) {
        editPage()
    }

}

initialize() //on appelle la fonction qui ajoutent les elements a la gallerie + qui les filtre grace aux boutons 

