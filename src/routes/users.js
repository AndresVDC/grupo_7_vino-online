const express = require('express');
const router = express.Router();
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
router.get('/profile/:id/edit', usersController.profileEdit)
router.patch('/profile/:id', usersController.profileEditPatch)
router.delete('/profile/:id', usersController.profileEditDelete)

// Avatar
router.get('/profile/:id/avatar', usersController.profileEditAvatar)
router.patch('/profile/:id/avatar', uploads.single('avatar'), usersController.profileEditPatchAvatar)

//Pass
router.get('/profile/:id/password', usersController.profileEditPassword)
router.patch('/profile/:id/password', usersController.profileEditPatchPassword)

// Logout
router.get('/logout', usersController.logout)

module.exports = router;
