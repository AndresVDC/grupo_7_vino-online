const path = require('path')
const fs = require ("fs")
const indexController = {
    home:  function(req, res) {
        let productJSON = fs.readFileSync("products.json", {encoding: 'utf-8'})
        let products = JSON.parse(productJSON)
        if (products.length <4) {
         for (let index = products.length; index < 4; index++){
          let nuevoProducto = {
            id: 999999,
            productName: "Sin datos",
            productScore: "Sin datos",
            productPrice: 0,
            productDetail: "Sin datos",
            img: "/images/botella-vino.webp",
            productDiscount: 0,
            productCategory: "Sin datos"
          }
          products.push(nuevoProducto)
         } 
        };
        res.render('index', { products: products });
      }
}
module.exports=indexController