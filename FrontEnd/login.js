//on declare la fonction qui recupere les donnees entrees par l'utilisateur dans le formulaire
function initialize() {

    //on cible le fomulaire
    const buttonSubmit = document.querySelector("#submitform")

    //on creait un evenement a l'action de validation des donnees rentrees par l'utilisateur
    buttonSubmit.addEventListener("submit", function (event) {

        //non execution de l'action par defaut si l'évènement n'est pas explicitement géré
        event.preventDefault()

        //on cible les cases pour email et mot de passe
        const email = document.querySelector("#email").value
        const password = document.querySelector("#motdepasse").value

        //on parametre userData avec les donnees de l'API
        const userData = {
            email: email,
            password: password,
        }

        //on appelle la fonction connexion qui execute les differents scenarios possibles lors de la connexion
        connexion(userData)
    })
}

//on declare la fonction connexion qui execute les differents scenarios possibles lors de la connexion
async function connexion(userData) {

    //on applique la requête qui permet d’envoyer les valeurs des entrées du formulaire
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })

    //on sauvegarde les donnees de userId et du token de l'API pour l'autentification dans result 
    if (response.status == 200) {
        const result = await response.json()

        //on sauvegarde le token d'authentification jusqu'a la deconnection
        window.localStorage.setItem("token", result.token)

        //on reoriente lutilisateur vers la page d'acceuil en cas de connection
        window.location.href = "http://localhost:5500/FrontEnd/";
    }

    //mot de passe incorrect 
    if (response.status == 401) {
        alert("mot de passe incorrect")
    }

    //identifiant de connection incorrect
    if (response.status == 404) {
        alert("e-mail incorrect")
    }
}

//on appelle la fonction initialize qui opere le processus de  connection
initialize()


