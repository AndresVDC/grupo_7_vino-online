window.addEventListener('load', () => {
    let formRegister = document.querySelector('form.register');
    formRegister.addEventListener('submit', e => {
        let errors = []
        // valida campo email
        let campoEmail = document.querySelector('input.email');
        if(campoEmail.value == ""){
           document.querySelector('p.loginEmail').innerHTML = "Completa el campo email por favor";
           document.querySelector('p.loginEmail').style.color = 'red'
        }
        // valida campo password
        let campoPassword = document.querySelector('input.password');
        if(campoPassword.value == ""){
            document.querySelector('p.loginPassword').innerHTML = "Completa el campo password por favor";
            document.querySelector('p.loginPassword').style.color = 'red'
        }
        e.preventDefault();
    })
})