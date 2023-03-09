/*recuperation des travaux dans le swagger*/
async function getProjects() {
    const projects = await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(dataProjects => dataProjects /*est ce necessaire de faire un then puis return, reciving end returning it*/
        )
    return projects
}

/*ajout des travaux recuperés dans la gallerie*/
async function addElements() {
    const projects = await getProjects()

    const gallery = document.querySelector("#portfolio > .gallery");

    for (const project of projects) {

        const newFigure = document.createElement("figure");

        const newImage = document.createElement("img");

        const newCaption = document.createElement("figcaption");

        newImage.setAttribute("src", project.imageUrl)
        newImage.setAttribute("alt", project.title)

        gallery.append(newFigure)

        newFigure.append(newImage, newCaption)

        newCaption.append(project.title)
    }

    const buttonObjets = document.querySelector(".button-objets");
    console.log(buttonObjets)
    buttonObjets.addEventListener("click", function () {
        const filtreObjet = projects.filter(function (project) {
            return project.categoryId == 1;

        });
        console.log(filtreObjet)
    })

}

addElements()


const projects = getProjects()



