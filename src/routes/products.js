var express = require('express');
var router = express.Router();
const path = require('path');
const productController = require(path.join('..', 'controllers', 'productController'));
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
})
 
var upload = multer({ storage: storage })

router.get("/", productController.productList)
router.get('/search', productController.search)
router.get('/category/:category', productController.category)
router.get("/create", productController.create)
router.post("/create",upload.any(), productController.save)
router.get("/productCart", productController.cart)
router.get("/edit/:id", productController.edit)
router.put("/edit/:id", productController.actualizar)
router.delete("/delete/:id",productController.delete)
router.get("/:id", productController.detail)



router.get("/productCart-empty", (req, res) => {
  res.render('products/productCart-empty',)
})

module.exports = router;