var express = require('express');
var router = express.Router();
const path = require('path');
const productController = require(path.join('..', 'controllers', 'productController'));
const {check, validationResult, body} = require('express-validator')
const multer = require('multer');
const routeMiddleware = require (path.join('..','midlleware', 'routeMiddleware'));
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
router.get('/create',routeMiddleware.loggedOut , productController.create)
router.post('/create', upload.any(),routeMiddleware.loggedOut ,[
  check('productName').isLength({min:5, max: 20}).withMessage('El nombre no debe estar vacvacíoio y requiere como mínimo 5 caracteres.'),
  check('productPrice').isDecimal({decimal_digits: '0,2'}).withMessage('El Precio no debe estar vacío, solo debe ingresar números y hasta 2 decimales.'),
  check('productDetail').isLength({min: 20, max:1000}).withMessage('El texto debe contener entre 20 y 1000 caracteres.'),
  check('productDiscount').isInt({min:0, max:99}).withMessage('Acepta hasta 2 números enteros.'),
  check('productScore').isInt({min: 0, max: 5}).withMessage('Acepta 1 número entero entre 0 y 5.'),
  check('productPresentation').isLength({min:6, max: 20}).withMessage('La presentación no debe estar vacía y requiere como mínimo 6 caracteres.'),
    check('image')
    .custom((value, {req}) => {
    if(req.files[0] == undefined){
      return false
    }
    else if(req.files[0].mimetype === 'image/png' || req.files[0].mimetype === 'image/jpeg' || req.files[0].mimetype === 'image/gif'){
        return '.png or .jpg'; // retorna un dato para indicar que es verdadero.
    }else{
        return false;
    }}).withMessage('Es obligatorio cargar una imagen del producto y los formatos aceptados son .PNG o .JPEG'),
], productController.save)
router.get('/productCart', productController.cart)
router.get('/edit/:id',routeMiddleware.loggedOut, productController.edit)
router.put('/edit/:id',routeMiddleware.loggedOut,[
  check('productName').isLength({min:5, max: 20}).withMessage('El nombre no debe estar vacío y requiere como mínimo 5 caracteres.'),
  check('productPrice').isDecimal({decimal_digits: '0,2'}).withMessage('El Precio no debe estar vacío, solo debe ingresar números y hasta 2 decimales.'),
  check('productDetail').isLength({min: 20, max:1000}).withMessage('El texto debe contener entre 20 y 1000 caracteres.'),
  check('productDiscount').isInt({min:0, max:99}).withMessage('Acepta hasta 2 números enteros.'),
  check('productScore').isInt({min:0, max:5}).withMessage('Acepta 1 número entero entre 0 y 5.'),
  check('productPresentation').isLength({min:6, max: 20}).withMessage('La presentación no debe estar vacía y requiere como mínimo 6 caracteres.'),
  check('image')
], productController.actualizar)
router.delete('/delete/fromCart/:id',routeMiddleware.loggedOut,productController.removeFromCart)
router.delete('/delete/:id', routeMiddleware.loggedOut, productController.delete)
router.get('/:id', productController.detail)
router.post('/addToCart',routeMiddleware.loggedOut,productController.addToCart)




module.exports = router;