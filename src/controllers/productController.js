const path = require('path')
const fs = require("fs")


const productController = {
    productList: (req, res) => {
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        res.render(path.join('products', 'productList'), { products: products })
    },
    create: (req, res) => {
        let nuevoProducto = {
            Producto: req.body.Producto,
            categoria: req.body.categoria,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        }
        res.render(path.join('products', 'formProduct'))
    },
    detail: (req, res) => {
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        let produtId = req.params.id
        let product = products[produtId - 1]
        res.render(path.join('products', 'productDetail'), { product: product })
    },
    edit: (req, res) => {

        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        let produtId = req.params.id
        let productToEdit = products[produtId - 1]
        res.render(path.join('products', 'productEdit'), { productToEdit: productToEdit })
    },
    actualizar: (req, res) => {
        res.send("PUT!")
    },
    cart: (req, res) => {
        res.render(path.join('products', 'productCart'))
    },

}

module.exports = productController;