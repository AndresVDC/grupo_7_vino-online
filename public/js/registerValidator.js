window.addEventListener('load', () => {
    let formRegister = document.querySelector('form.register');
    formRegister.addEventListener('submit', e => {
        let errors = []
        //valida campo nombre
        let campoName = document.querySelector('input.name');
        if(campoName.value == ""){
            document.querySelector('p.registerName').innerHTML = "No dejes el campo nombre vacio"
        }
        //valida campo apellido
        let campoLastName = document.querySelector('input.surname');
        if(campoLastName.value == ""){
            document.querySelector('p.registerSurname').innerHTML = "No dejes el campo apellido vacio"
        }
        // valida campo email
        let campoEmail = document.querySelector('input.email');
        if(campoEmail.value == ""){
            document.querySelector('p.registerEmail').innerHTML = "No dejes el campo email vacio"
        }
        // valida campo password
        let campoPassword = document.querySelector('input.password');
        if(campoPassword.value == ""){
            document.querySelector('p.registerPassword').innerHTML = "No dejes el campo password vacio"
        }
        e.preventDefault();
    })
})