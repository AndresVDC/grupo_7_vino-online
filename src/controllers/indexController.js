const path = require('path')
//variable en la que se declara el archivo producto.
let db = require(path.join('..', 'database', 'models'))
const indexController = {
  home: function (req, res) {
    //let products = fileController.openFile(productsJson)
    db.Products.findAll({ limit: 4 })
      .then(function (products) {
        res.render('index', { products: products });
      })
      .catch()
  }
}
module.exports = indexController