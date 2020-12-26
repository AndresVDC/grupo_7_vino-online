const path = require('path')
const fs = require ("fs")
const indexController = {
    home:  function(req, res) {
        let productJSON = fs.readFileSync("products.json", {encoding: 'utf-8'})
        let products = JSON.parse(productJSON)
        res.render('index', { products: products });
      }
}
module.exports=indexController