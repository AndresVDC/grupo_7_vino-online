const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require(path.join('..', 'controllers','usersController'));
const multer= require('multer');
const {check, validatorResult, body} = require('express-validator');

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
router.get('/register', usersController.indexRegister)

router.post('/register', uploads.single('avatar'), usersController.save)

//LOGIN

router.get('/login', usersController.indexLogin)

router.get('/changePassword', usersController.changePassword)

router.post('/changePassword', usersController.changePasswordSave)

router.post('/login', [
  check('email').isEmail().withMessage('El formato es invalido'),
  check('password').isEmpty().withMessage('Debe completar la password')
],usersController.ingreso)

router.get('/profile/:id', usersController.profile)

router.get('/profile/:id/edit', usersController.profileEdit)

router.get('/profile/:id/delete', usersController.profileConfirmDelete)

router.patch('/profile/:id', usersController.profileEditPatch)

router.delete('/profile/:id', usersController.profileEditDelete)

router.get('/profile/:id/avatar', usersController.profileEditAvatar)

router.patch('/profile/:id/avatar', uploads.single('avatar'), usersController.profileEditPatchAvatar)

router.get('/profile/:id/password', usersController.profileEditPassword)

router.patch('/profile/:id/password', usersController.profileEditPatchPassword)

module.exports = router;
