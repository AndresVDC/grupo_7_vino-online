window.addEventListener('load', () => {
    // valida el campo nombre
    let campoName = document.querySelector("input.name");
    
    campoName.addEventListener('blur', e =>{
        if(campoName.value.length >= 2){
          document.querySelector('p.registerName').innerHTML = "";
        }else {
          
          document.querySelector('p.registerName').innerHTML = "El campo nombre requiere más de 2 caracteres";
          document.querySelector('p.registerName').style.color = 'red'
        }
        e.preventDefault()
      })
    // valida campo apellido
    let campoLastname = document.querySelector("input.surname");
    
    campoLastname.addEventListener('blur', e =>{
        if(campoLastname.value.length >= 2){
          document.querySelector('p.registerSurname').innerHTML = "";
        }else {
          
          document.querySelector('p.registerSurname').innerHTML = "El campo apellido requiere más de 2 caracteres";
          document.querySelector('p.registerSurname').style.color = 'red'
        }
        e.preventDefault()
      })
    // valida campo email
    regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g // requiere que sea formato email
    let email = document.querySelector("input.email");

    email.addEventListener('blur', e =>{
        if(email.value.match(regexEmail)){
            document.querySelector('p.registerEmail').innerHTML = "";
        }else {
    
            document.querySelector('p.registerEmail').innerHTML = "Completa el email con un formato valido";
            document.querySelector('p.registerEmail').style.color = 'red'
        }
    e.preventDefault()
    })
    // valida campo password
    let campoPassword = document.querySelector("input.password");
    
    campoPassword.addEventListener('blur', e =>{
        if(campoPassword.value.length >= 6){
          document.querySelector('p.registerPassword').innerHTML = "";
        }else {
          
          document.querySelector('p.registerPassword').innerHTML = "La password requiere más de 6 caracteres";
          document.querySelector('p.registerPassword').style.color = 'red'
        }
        e.preventDefault()
      })
    
    let formRegister = document.querySelector('form.register');
    formRegister.addEventListener('submit', event => {
        
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
        errors == true ? event.preventDefault() : ''
    })
        

})