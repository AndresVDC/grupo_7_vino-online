const path = require('path')
//variable en la que se declara el archivo producto.
let db = require(path.join('..', 'database', 'models'))
const indexController = {
  home: function (req, res) {
    //let products = fileController.openFile(productsJson)
    db.Products.findAll({ 
      limit: 4,
      order: db.sequelize.random()
     })
      .then(function (products) {
        res.render('index', { products: products });
      })
      .catch((error) => {
        console.log('***********************')
        console.log('SE PRESENTO UN PROBLEMA DE CONEXION A LA DB Y NO ES POSIBLE CONSULTAR LOS PRODUCTOS. Error: ' + error)
        console.log('***********************')
        res.render('somethingWrong')
    })
  },
  somethingWrong: (req, res) => {
		res.render('somethingWrong')
	}
}
module.exports = indexController