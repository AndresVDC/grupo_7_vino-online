window.addEventListener('load', () => {

        document.querySelector('p.errorName').style.fontSize = '18px';
        document.querySelector('p.errorName').style.color = 'red';
        document.querySelector('p.errorSurname').style.fontSize = '18px';
        document.querySelector('p.errorSurname').style.color = 'red';

    let inputName = document.querySelector('input.nombre');

    inputName.addEventListener('blur', e =>{
        if(inputName.value.length >= 1){
            document.querySelector('p.errorName').innerHTML = "";
        }else {

            document.querySelector('p.errorName').innerHTML = "No dejes el campo nombre vacio.";
            document.querySelector('p.errorName').style.fontSize = '18px';
            document.querySelector('p.errorName').style.color = 'red'
        }
        e.preventDefault()
        })

    let inputSurname = document.querySelector('input.apellido');

    inputSurname.addEventListener('blur', e =>{
        if(inputSurname.value.length >= 1){
            document.querySelector('p.errorSurname').innerHTML = "";
        }else {
    
            document.querySelector('p.errorSurname').innerHTML = "No dejes el campo nombre vacio.";
            document.querySelector('p.errorSurname').style.fontSize = '18px';
            document.querySelector('p.errorSurname').style.color = 'red'
        }
        e.preventDefault()
        })

})