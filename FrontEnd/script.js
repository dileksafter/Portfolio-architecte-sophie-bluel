//recuperation des travaux dans le swagger
async function getProjects() {
    const projects = await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
    return projects
}

//ajout des travaux recuperés dans la gallerie
function addElements(projects) {

    const gallery = document.querySelector("#portfolio > .gallery");

    //creating a for cycle to target each index of the array
  for (let i = 0; i < projects.length; i++){ 
    
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

/*filtre des elemenst de la gallerie*/
async function filterElements() {

    const projects = await getProjects()

    //afficher a l'ecran tous les elements du swagger 
    addElements(projects)

    console.log(projects)

    //cible les boutons filtres crees en Html 
    const buttonTous = document.querySelector(".button-tous");

    const buttonObjets = document.querySelector(".button-objets");

    const buttonAppartements = document.querySelector(".button-appartements");

    const buttonHôtelsetrestaurants = document.querySelector(".button-hôtelsetrestaurants");


    

    buttonTous.addEventListener("click", function () {
        console.log(projects)
        addElements(projects)
    })

    

    buttonObjets.addEventListener("click", function () {
        const filtreObjet = projects.filter(function (project) {
            return project.categoryId == 1;

        });
        console.log(filtreObjet)
        addElements(filtreObjet)

    })

    
    buttonAppartements.addEventListener("click", function () {
        const filtreAppartements = projects.filter(function (project) {
            return project.categoryId == 2;

        });
        console.log(filtreAppartements)
        addElements(filtreAppartements)
    })

    
    buttonHôtelsetrestaurants.addEventListener("click", function () {
        const filtreHôtelsetrestaurants = projects.filter(function (project) {
            return project.categoryId == 3;

        });
        console.log(filtreHôtelsetrestaurants)
        addElements(filtreHôtelsetrestaurant)
    })

}


filterElements()


