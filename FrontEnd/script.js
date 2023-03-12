//recuperation des travaux dans le swagger
async function getProjects() {
    const projects = await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(projects => Array.from(new Set(projects))) //verification et elimination des eventuels duplicats de travaux, creation dun array a partir de objet set
    return projects
}

//ajout des travaux recuperés dans la gallerie
function addElements(projects) {

    const gallery = document.querySelector("#portfolio > .gallery");

    //creating a for cycle to target each index of the array
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

async function initialize(){ 
    const projects = await getProjects()
    addElements(projects)
}

/*filtre des elemenst de la gallerie*/
async function filterElements() {

    const projects = await getProjects()

    //cible les boutons filtres crees en Html 
    const buttonTous = document.querySelector(".button-tous");

    const buttonObjets = document.querySelector(".button-objets");

    const buttonAppartements = document.querySelector(".button-appartements");

    const buttonHôtelsetrestaurants = document.querySelector(".button-hôtelsetrestaurants");

    //cible de la gallerie pour l'etape suivante
    const gallery = document.querySelector("#portfolio > .gallery")

    buttonTous.addEventListener("click", function () {
        gallery.innerHTML = "" //on vide le contenu de la gallerie au click grace a innerHTML
        addElements(projects) //on appelle la fonction qui ajoute les elements a lecran 
    })

    buttonObjets.addEventListener("click", function () {
        gallery.innerHTML = "" //on vide le contenu de la gallerie au click grace a innerHTML

        //on creait la constante filter qui retourne tous les elements de projects categoryId = 1 qui correspond a Objets 
        const filtreObjet = projects.filter(function (project) {
            return project.categoryId == 1;
        });
        addElements(filtreObjet) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })

    buttonAppartements.addEventListener("click", function () {
        gallery.innerHTML = "" //on vide le contenu de la gallerie au click grace a innerHTML

        //on creait la constante filter qui retourne tous les elements de projects categoryId = 2 qui correspond a Appartements 
        const filtreAppartements = projects.filter(function (project) {
            return project.categoryId == 2;
        });
        addElements(filtreAppartements) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })

    buttonHôtelsetrestaurants.addEventListener("click", function () {
        gallery.innerHTML = "" //on vide le contenu de la gallerie au click grace a innerHTML

        //on creait la constante filter qui retourne tous les elements de projects categoryId = 3 qui correspond a Hôtelsetrestaurants 
        const filtreHôtelsetrestaurants = projects.filter(function (project) {
            return project.categoryId == 3;
        });
        addElements(filtreHôtelsetrestaurants) //on appelle la fonction qui ajoute uniquement les elements filtrés a lecran 
    })
}

initialize()

filterElements() //fonction filtre


