var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

router.get("/register", usersController.vista);
router.post("/register", usersController.create);

router.get("/login", (req,res) => {
  res.render('users/login',)
})

module.exports = router;
