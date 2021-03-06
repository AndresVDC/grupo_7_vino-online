var {check} = require ('express-validator')

module.exports= [
    check('first_name').isLength({min:3}).withMessage('El campo nombre requiere un minimo de 3 caracteres'),
    check('last_name').isLength({min:3}).withMessage('El campo apellido requiere un minimo de 3 caracteres'),  
    check('email').isEmail().withMessage('El formato de email es invalido'),
    check('password').isLength({min:4}).withMessage('La password debe tener 4 caracteres como minimo')
  ]