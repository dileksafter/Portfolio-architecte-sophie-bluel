
async function connexion() {

    let user = {
        "email": "sophie.bluel@test.tld",
        "password": "S0phie"
    };



    let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())

    alert(response.token);



}

function getValue(){
    const value
}


connexion()
getValue ()