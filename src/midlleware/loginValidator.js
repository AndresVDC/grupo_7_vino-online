var {check} = require ('express-validator')

module.exports= [
    check('email').isEmail().withMessage('El formato de email es invalido'),
    check('password').isLength({min:6}).withMessage('La password debe tener 6 caracteres como minimo')
  ]