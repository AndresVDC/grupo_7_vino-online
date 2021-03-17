window.addEventListener('load', () => {
    let formEditPass = document.querySelector('form.editPassword');
    formEditPass.addEventListener('submit', e => {

        document.querySelector('p.errorPass').style.fontSize = '18px';
        document.querySelector('p.errorPass').style.color = 'red';
        document.querySelector('p.errorPass1').style.fontSize = '18px';
        document.querySelector('p.errorPass1').style.color = 'red';
        document.querySelector('p.errorPass2').style.fontSize = '18px';
        document.querySelector('p.errorPass2').style.color = 'red';

        let passErrors = false
        

        let password = document.querySelector('input.password');
        if(password.value == ''){
            document.querySelector('p.errorPass').innerHTML = "No dejes el campo vacio.";
            document.querySelector('p.errorPass').style.fontSize = '18px';
            document.querySelector('p.errorPass').style.color = 'red'
            passErrors = true
        }

        let password1 = document.querySelector('input.password1');
        if(password1.value == ''){
            document.querySelector('p.errorPass1').innerHTML = "No dejes el campo vacio.";
            document.querySelector('p.errorPass1').style.fontSize = '18px';
            document.querySelector('p.errorPass1').style.color = 'red'
            passErrors = true
        }

        let password2 = document.querySelector('input.password2');
        if(password2.value == ''){
            document.querySelector('p.errorPass2').innerHTML = "No dejes el campo vacio.";
            document.querySelector('p.errorPass2').style.fontSize = '18px';
            document.querySelector('p.errorPass2').style.color = 'red'
            passErrors = true
        }
        
        passErrors == true ? e.preventDefault() : ''

    })
    
})