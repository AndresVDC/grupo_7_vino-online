var express = require('express');
var router = express.Router();
const path = require('path');
const productController = require(path.join('..', 'controllers', 'productController'));
const {check, validationResult, body} = require('express-validator')
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage })

router.get('/', productController.productList)
router.get('/search', productController.search)
router.get('/category/:category', productController.category)
router.get('/create', productController.create)
router.post('/create', upload.any(),[
  check('productName').isLength({min:6}).withMessage('El nombre no debe estar vacio y requiere como mínimo 6 caracteres.'),
  check('productPrice').isDecimal({decimal_digits: '0,2'}).withMessage('El Precio no debe estar vacio, solo debe ingresar números y hasta 2 decimales.'),
  check('productDetail').isLength({max:280}).withMessage('El texto no debe superar los 280 caracteres.'),
  check('productDiscount').isInt({min:0, max:99}).withMessage('Acepta hasta 2 números enteros.'),
  check('productScore').isInt({min: 0, max: 5}).withMessage('Acepta 1 número entero entre 0 y 5.'),
  check('productPresentation').isLength({min:6}).withMessage('El nombre no debe estar vacio y requiere como mínimo 6 caracteres.'),
  check('image')
], productController.save)
router.get('/productCart', productController.cart)
router.get('/edit/:id', productController.edit)
router.put('/edit/:id',[
  check('productName').isLength({min:6}).withMessage('El nombre no debe estar vacio y requiere como mínimo 6 caracteres.'),
  check('productPrice').isDecimal({decimal_digits: '0,2'}).withMessage('El Precio no debe estar vacio, solo debe ingresar números y hasta 2 decimales.'),
  check('productDetail').isLength({max:280}).withMessage('El texto no debe superar los 280 caracteres.'),
  check('productDiscount').isInt({min:0, max:99}).withMessage('Acepta hasta 2 números enteros.'),
  check('productScore').isInt({min:0, max:5}).withMessage('Acepta 1 número entero entre 0 y 5.'),
  check('productPresentation').isLength({min:6}).withMessage('El nombre no debe estar vacio y requiere como mínimo 6 caracteres.'),
  check('image')
], productController.actualizar)
router.delete('/delete/:id', productController.delete)
router.get('/:id', productController.detail)



module.exports = router;