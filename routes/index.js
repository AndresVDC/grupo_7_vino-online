var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/productCart", (req,res) => {
  res.render('productCart',)
})

router.get("/productDetail", (req,res) => {
  res.render('productDetail',)
})

router.get("/productCart-empty", (req,res) => {
  res.render('productCart-empty',)
})

router.get("/register", (req,res) => {
  res.render('register',)
})

router.get("/login", (req,res) => {
  res.render('login',)
})

router.get("/productList", (req,res) => {
  res.render('productList',)
})

module.exports = router;
