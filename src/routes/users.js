const express = require('express');
const router = express.Router()
const path = require('path');
const usersController = require(path.join('..', 'controllers','usersController'));
const routeMiddleware = require (path.join('..','midlleware', 'routeMiddleware'));
const multer= require('multer');
const {check, validatorResult, body} = require('express-validator');
const loginValidator = require('../midlleware/loginValidator');
const registerValidator = require('../midlleware/registerValidator');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('src', 'uploads', 'uploadsAvatars'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname) )
  }
})
var uploads = multer({ storage: storage })

//REGISTER
router.get('/register', routeMiddleware.logueado ,usersController.indexRegister)
router.post('/register', registerValidator, usersController.save)

//LOGIN
router.get('/login', routeMiddleware.logueado, usersController.indexLogin)
router.post('/login', loginValidator,usersController.ingreso)

//Change Pass
router.get('/changePassword', usersController.changePassword)
router.post('/changePassword', usersController.changePasswordSave)

// Profile
router.get('/profile/:id', usersController.profile)
router.get('/profile/edit/:id', usersController.profileEdit)
router.post('/profile/edit/:id', [check('first_name').not().isEmpty().withMessage('El campo nombre requiere un minimo de 1 caracter'),
check('last_name').not().isEmpty().withMessage('El campo apellido requiere un minimo de 1 caracter')], usersController.profileEditPatch)

// Avatar
router.get('/profile/avatar/:id', usersController.profileEditAvatar)
router.post('/profile/avatar/:id', uploads.single('avatar'), usersController.profileEditPatchAvatar)

//Pass
router.get('/profile/editPassword/:id', usersController.profileEditPassword)
router.post('/profile/editPassword/:id', [check('password1').not().isEmpty().withMessage('Debe completar este campo'),
check('password2').not().isEmpty().withMessage('Debe completar este campo'),
check('password3').not().isEmpty().withMessage('Debe completar este campo')] , 
usersController.profileEditPatchPassword)

// Logout
router.get('/logout', usersController.logout)

module.exports = router;
