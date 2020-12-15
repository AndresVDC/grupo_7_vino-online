var express = require('express');
var router = express.Router();

router.get("/productCart", (req,res) => {
    res.render('productCart',)
  })
  
  router.get("/productDetail", (req,res) => {
    res.render('productDetail',)
  })
  
  router.get("/productCart-empty", (req,res) => {
    res.render('productCart-empty',)
  })

  router.get("/productList", (req,res) => {
    res.render('productList',)
  })
  router.get("/formProduct", (req,res)=>{
    res.render('formProduct')
  })
  router.post('/formProduct', function(req, res){
    let nuevoProducto={
        Producto: req.body.Producto,
        categoria:req.body.categoria,
        precio:req.body.precio,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen}
  
    res.send(nuevoProducto)
  })

  module.exports = router;