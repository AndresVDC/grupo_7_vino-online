<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require(path.join('..', 'controllers','usersController'));
const multer= require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('src', 'uploads', 'uploadsAvatars'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname) )
  }
})
=======
var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

router.get("/register", usersController.vista);
router.post("/register", usersController.create);
>>>>>>> 106af870a081ae6fd57d3a036f3c85afe6274bc3

var uploads = multer({ storage: storage })
//REGISTER
router.get('/register', usersController.indexRegister)

router.post('/register', uploads.single('avatar'), usersController.save)

//LOGIN

router.get('/login', usersController.indexLogin)

router.post('/login', usersController.ingreso)

router.get('/profile/:id', usersController.profile)

router.get('/profile/:id/edit', usersController.profileEdit)

router.patch('/profile/:id', usersController.profileEditPatch)

router.delete('/profile/:id', usersController.profileEditDelete)

router.get('/profile/:id/avatar', usersController.profileEditAvatar)

router.patch('/profile/:id/avatar', uploads.single('avatar'), usersController.profileEditPatchAvatar)

router.get('/profile/:id/password', usersController.profileEditPassword)

router.patch('/profile/:id/password', usersController.profileEditPatchPassword)

module.exports = router;
