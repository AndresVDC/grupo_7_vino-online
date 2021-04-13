Hola! realice npm start en su consola e ingrese en http://localhost:3001/ 

# Registro 
Para registrar su usuario de dirigirse a http://localhost:3001/users/register
- Errores de front-end - ok
- Errores de back-end (validation result) - Ok 
- Email ya registrado devuelve error -ok 

Se registra un usuario comprador con exito y redirige a http://localhost:3001/users/login:

# Login
- Errores de front-end - ok
- Errores de back-end (validation result) - Ok 
- Se intenta loguear con un email no registrado y arroja el error de email no registrado.
- Se ingresa con exito y se coloca el recordame para generar las cookies.

Se ingresa a http://localhost:3001 con la session iniciada. 

# Session & Cookies 
Se cierra el navegador, se vuelve a ingresar y se mantiene la session por las cookies.
Se cierra http://localhost:3001 y se abre una nueva pestaña en mismo navegador,se vuelve a ingresar y mantiene la session.

# Midlleware
Se intenta ingresa con el usuario logueado a http://localhost:3001/users/login y http://localhost:3001/users/register sin exito.

# Profile
- Se editan nombre y apellido con exito.
- Se edita avatar con exito
- Se cambia contraseña con exito. 

- [Se cierra y se vuelve a iniciar session con nueva clave con exito.] 

# Productos y Carrito
- Se agregan 2 productos al carrito y se elimina uno de ellos con exito.
- En el buscador se consulta por nombre de un producto y lo trae.