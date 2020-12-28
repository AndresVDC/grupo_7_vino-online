var express = require('express');
var router = express.Router();
const path = require('path')
const productController = require(path.join('..', 'controllers', 'productController'))

router.get("/", productController.productList)
router.get("/create", productController.create)
router.post("/create",productController.save)
router.get("/productCart", productController.cart)
router.get("/edit/:id", productController.edit)
router.put("/edit/:id", productController.actualizar)
router.delete("/delete/:id",productController.delete)
router.get("/:id", productController.detail)



router.get("/productCart-empty", (req, res) => {
  res.render('products/productCart-empty',)
})

module.exports = router;