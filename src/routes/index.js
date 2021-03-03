var express = require('express');
var router = express.Router();
const path = require('path')
const indexController = require(path.join('..','controllers','indexController'))

/* GET home page. */
router.get('/', indexController.home);
router.get('/somethingWrong', indexController.somethingWrong)





module.exports = router;
