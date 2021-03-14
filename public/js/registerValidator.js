window.addEventListener('load', () => {
    let formRegister = document.querySelector('form.register');
    formRegister.addEventListener('submit', e => {
        
        let errors = false
        //valida campo nombre
        let campoName = document.querySelector('input.name');
        if(campoName.value == ""){
            document.querySelector('p.registerName').innerHTML = "No dejes el campo nombre vacio.";
            document.querySelector('p.registerName').style.color = 'red'
            errors = true
        }
        //valida campo apellido
        let campoLastName = document.querySelector('input.surname');
        if(campoLastName.value == ""){
            document.querySelector('p.registerSurname').innerHTML = "No dejes el campo apellido vacio.";
            document.querySelector('p.registerSurname').style.color = 'red'
            errors = true
        }
        // valida campo email
        let campoEmail = document.querySelector('input.email');
        if(campoEmail.value == ""){
            document.querySelector('p.registerEmail').innerHTML = "No dejes el campo email vacio.";
            document.querySelector('p.registerEmail').style.color = 'red'
            errors = true
        }
        // valida campo password
        let campoPassword = document.querySelector('input.password');
        if(campoPassword.value == ""){
            document.querySelector('p.registerPassword').innerHTML = "No dejes el campo password vacio.";
            document.querySelector('p.registerPassword').style.color = 'red'
            errors = true
        }
        errors == true ? e.preventDefault() : ''
    })
})