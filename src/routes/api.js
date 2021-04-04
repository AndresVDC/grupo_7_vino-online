var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/products/page=:pag?', apiController.products);
router.get('/products', apiController.products);
router.get('/products/:id', apiController.productDetails);
router.get('/wineries', apiController.wineries);
router.get('/users', apiController.users);
router.get('/users/:id', apiController.userDetails);

module.exports = router;