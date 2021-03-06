window.addEventListener('load', () => {
    let form = document.querySelector('form.form-product');
    form.addEventListener('submit', e => {
        let error = false;
        //Valida el titulo del producto
        let productName = document.querySelector('input[name="productName"]');
        if (productName.value == "") {
            document.querySelector('p.productName').innerHTML = "El título del producto no puede quedar vacío.";
            error = true;
        }
        else if (productName.value.length < 5 || productName.value.length > 20) {
            document.querySelector('p.productName').innerHTML = "El título debe contener entre 5 y 20 caracteres."
            error = true;
        }
        else {
            document.querySelector('p.productName').innerHTML = ''
        }
        //Valida el campo descripción
        let productDesc = document.querySelector('textarea');
        if (productDesc.value.length < 20) {
            document.querySelector('p.productDesc').innerHTML = "La descripción debe contener al menos 20 caracteres.";
            error = true;
        }
        else {
            document.querySelector('p.productDesc').innerHTML = ''
        }
        //Valida el campo imagen
        let extensionesPermitidas = ["jpeg", "jpg", "png", "gif"]
        let image = document.querySelector('input[name="image"]');
        if (image != undefined) {
            let extension = image.value.substring(image.value.lastIndexOf('.') + 1).toLowerCase()

            if (image.value == "") {
                document.querySelector('p.image').innerHTML = "La imagen del producto no puede quedar vacía.";
                error = true;
            }
            else if (extensionesPermitidas.indexOf(extension) == -1) {
                document.querySelector('p.image').innerHTML = "Las extensiones de imagen permitidas son " + extensionesPermitidas + ".";
                error = true;
            }
            else {
                document.querySelector('p.image').innerHTML = ''
            }
        }
        //Valida el campo precio
        let productPrice = document.querySelector('input[name="productPrice"]');
        if (productPrice.value == "") {
            document.querySelector('p.productPrice').innerHTML = "El precio del producto no puede quedar vacío.";
            error = true;
        }
        else if (isNaN(productPrice.value)) {
            document.querySelector('p.productPrice').innerHTML = "El precio debe ser numerico y contener hasta 2 decimales."
            error = true;
        }
        else {
            document.querySelector('p.productPrice').innerHTML = ''
        }
        //Valida el campo descuento
        let productDiscount = document.querySelector('input[name="productDiscount"]');
        if (productDiscount.value == "") {
            document.querySelector('p.productDiscount').innerHTML = "El descuento del producto no puede quedar vacío.";
            error = true;
        }
        else if (isNaN(productDiscount.value)) {
            document.querySelector('p.productDiscount').innerHTML = "El descuento debe ser numerico y hasta 2 dígitos."
            error = true;
        }
        else {
            document.querySelector('p.productDiscount').innerHTML = ''
        }
        //Valida el campo Score
        let productScore = document.querySelector('input[name="productScore"]');
        if (productScore.value == "") {
            document.querySelector('p.productScore').innerHTML = "El score del producto no puede quedar vacío.";
            error = true;
        }
        else if (isNaN(productScore.value)) {
            document.querySelector('p.productScore').innerHTML = "El score debe ser numerico."
            error = true;
        }
        else if (productScore.value < 0 || productScore.value > 5) {
            document.querySelector('p.productScore').innerHTML = "El score debe ser un entero entre 0 y 5."
            error = true;
        }
        else {
            document.querySelector('p.productScore').innerHTML = ''
        }
        //Valida el campo Presentación
        let productPresentation = document.querySelector('input[name="productPresentation"]');
        if (productPresentation.value == "") {
            document.querySelector('p.productPresentation').innerHTML = "La presentación del producto no puede quedar vacío.";
            error = true;
        }
        else if (productPresentation.value.length < 6 || productPresentation.value.length > 20) {
            document.querySelector('p.productPresentation').innerHTML = "La presentación debe contener entre 6 y 20 caracteres."
            error = true;
        }
        else {
            document.querySelector('p.productPresentation').innerHTML = ''
        }
        error == true ? e.preventDefault() : ''
    });

})


