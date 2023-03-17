//on declare la fonction qui recupere les donnees entrees par l'utilisateur sur l'interface du site
function getValues() {

    const buttonSubmit = document.querySelector("#submit")

    buttonSubmit.addEventListener("submit", function () {

        const email = document.querySelector("#email").value
        const password = document.querySelector("#motdepasse").value

        const userData = {
            email: email,
            password: password,
        }

     connexion(userData)
    })
}

async function connexion(userData) {
    

    let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())

    alert(response);
}



getValues()


