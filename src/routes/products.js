var express = require('express');
var router = express.Router();
const path = require('path')
const productController = require(path.join('..', 'controllers', 'productController'))

router.get("/", productController.productList)
router.get("/create", productController.create)
router.get("/productCart", productController.cart)
router.get("/:id", productController.detail)
router.get("/:id/edit", productController.edit)
router.put("/:id", productController.actualizar)



router.get("/productCart-empty", (req, res) => {
  res.render('products/productCart-empty',)
})

module.exports = router;