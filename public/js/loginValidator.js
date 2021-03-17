window.addEventListener('load', () => {
    //valida email
    regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g // requiere que sea formato email
    let email = document.querySelector("input.email");
    
    email.addEventListener('blur', e =>{
      if(email.value.match(regexEmail)){
        document.querySelector('p.loginEmail').innerHTML = "";
      }else {
        
        document.querySelector('p.loginEmail').innerHTML = "Completa el email con un formato valido";
        document.querySelector('p.loginEmail').style.color = 'red'
      }
      e.preventDefault()
    })
    // valida password
    let password = document.querySelector("input.password");
    
    password.addEventListener('blur', e =>{
        if(password.value.length >= 6){
          document.querySelector('p.loginEmail').innerHTML = "";
        }else {
          
          document.querySelector('p.loginPassword').innerHTML = "La password requiere más de 6 caracteres";
          document.querySelector('p.loginPassword').style.color = 'red'
        }
        e.preventDefault()
      })
    
})

