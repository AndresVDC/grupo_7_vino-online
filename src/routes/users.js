var express = require('express');
var router = express.Router();

router.get("/register", (req,res) => {
  res.render('users/register',)
})

router.get("/login", (req,res) => {
  res.render('users/login',)
})

module.exports = router;
