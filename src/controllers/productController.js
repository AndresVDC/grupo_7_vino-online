const path = require('path')
const fs = require("fs")


const productController = {
    productList: (req, res) => {
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        res.render(path.join('products', 'productList'), { products: products })
    },
    create: (req, res) => {

        res.render(path.join('products', 'formProduct'))
    },
    save: (req, res) => {
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        let nuevoProducto = {
            id: products.length + 1,
            productName: req.body.producto,
            productScore: req.body.score,
            productPrice: req.body.precio,
            productDetail: req.body.descripcion,
            img: req.body.imagen,
            productDiscount: req.body.descuento,
            productCategory: req.body.categoria
        }
        products.push(nuevoProducto)
        products = JSON.stringify(products)
        fs.writeFileSync('products.json', products)
        res.redirect('/products')
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
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        products.forEach(element => {
            if (element.id == req.params.id) {
                element.productName = req.body.productName
                element.productScore = req.body.productScore
                element.productPrice = req.body.productPrice
                element.productDetail = req.body.productDetail
                element.productDiscount = req.body.productDiscount
                element.productCategory = req.body.productCategory
            }
        });
        products = JSON.stringify(products)
        fs.writeFileSync('products.json', products)
        res.redirect('/products')
    },
    cart: (req, res) => {
        res.render(path.join('products', 'productCart'))
    },
    delete: (req, res) => {
        let productJSON = fs.readFileSync("products.json", { encoding: 'utf-8' })
        let products = JSON.parse(productJSON)
        let filtrados

        for (let index = 0; index < products.length; index++) {
            let element = products[index];
            if (element.id == req.params.id) {
                filtrados = products.filter(function (i) {
                    return i != element
                })
            }
        }
        filtrados = JSON.stringify(filtrados)
        fs.writeFileSync('products.json', filtrados)
        res.redirect('/products')
    }

}

module.exports = productController;