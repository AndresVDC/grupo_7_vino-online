const path = require('path')
const fileController = require(path.join('..', 'controllers', 'fileController'))
//variable en la que se declara el archivo producto.
let productsJson = path.join('src','data','products.json')
const indexController = {
    home:  function(req, res) {
        let products = fileController.openFile(productsJson)
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