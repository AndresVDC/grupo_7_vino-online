const session = require('express-session')
const { validationResult } = require('express-validator')
const path = require('path')
const fileController = require(path.join('..', 'controllers', 'fileController'))
//variable en la que se declara el archivo producto.
let productsJson = path.join('src', 'data', 'products.json')
let db = require(path.join('..', 'database', 'models'))
const productController = {
    productList: (req, res) => {
        db.Products.findAll()
            .then(function (products) {
                res.render(path.join('products', 'productList'), { products: products })
            })
            .catch()
    },
    create: (req, res) => {
        res.render(path.join('products', 'formProduct'), { errors: {}, nuevoProducto: {} })
    },
    save: (req, res) => {
        let nuevoProducto = {
            productName: req.body.productName,
            productScore: req.body.productScore,
            productPrice: req.body.productPrice,
            productDetail: req.body.productDetail,
            img: "/images/" + req.files[0].filename,
            productDiscount: req.body.productDiscount,
            productPresentation: req.body.productPresentation,
            productCategory: req.body.productCategory
        }

        //Detección de errores
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render(path.join('products', 'formProduct'), { errors: errors.mapped(), nuevoProducto: nuevoProducto })
        }
        db.Products.create({
            name: req.body.productName,
            score: req.body.productScore,
            price: req.body.productPrice,
            detail: req.body.productDetail,
            image: "/images/" + req.files[0].filename,
            discount: req.body.productDiscount,
            presentation: req.body.productPresentation,
            idVarietal: req.body.productCategory,
            idWinery: 1
        }).then(
            res.redirect('/products')
        ).catch()
    },
    detail: (req, res) => {
        //let product = findProductIndex(products)
        //products.forEach(element => {
        //    if (element.productCategory == products[product].productCategory) {
        //        productsRel.push(element)
        //    }
        //});
        //if (productsRel.length < 4) {
        //    for (let index = productsRel.length; index < 4; index++) {
        //        let nuevoProducto = {
        //            id: 999999,
        //            productName: "Sin datos",
        //            productScore: "Sin datos",
        //            productPrice: 0,
        //            productDetail: "Sin datos",
        //            img: "/images/botella-vino.webp",
        //            productDiscount: 0,
        //            productCategory: "Tinto"
        //        }
        //        productsRel.push(nuevoProducto)
        //    }
        //}
        db.Products.findByPk(req.params.id)
            .then(function (product) {
                res.render(path.join('products', 'productDetail'), { product: product })
            })
            .catch()


        //Este IF se encarga de evitar el acceso a productos inexistentes.
        //if (product == -1) {
        //    res.send("Producto inexistente!")
        //}
        //else {
        //    product = products[findProductIndex(products)]
        //    res.render(path.join('products', 'productDetail'), { product: product, productsRel: productsRel })
        //}
    },
    edit: (req, res) => {
        let products = fileController.openFile(productsJson)
        let produtId = req.params.id
        let productToEdit = products[produtId - 1]
        let errors = {}
        res.render(path.join('products', 'productEdit'), { productToEdit: productToEdit, errors: errors })
    },
    actualizar: (req, res) => {
        let products = fileController.openFile(productsJson)
        //Se lee el archivo para encotrar el objeto y poder mostrar los datos en caso de error.
        let produtId = req.params.id
        products.forEach(element => {
            if (element.id == req.params.id) {
                element.productName = req.body.productName
                element.productScore = req.body.productScore
                element.productPrice = req.body.productPrice
                element.productDetail = req.body.productDetail
                element.productDiscount = req.body.productDiscount
                element.productCategory = req.body.productCategory
                element.productPresentation = req.body.productPresentation
            }
        });
        let productToEdit = products[produtId - 1]
        //Detección de errores
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render(path.join('products', 'productEdit'), { errors: errors.mapped(), productToEdit: productToEdit })
        }

        fileController.saveFile(products, productsJson)
        res.redirect('/products')
    },
    cart: (req, res) => {
        let empty = true
        let total = req.session.total
        if (req.session.cart) {
            empty = false
        }
        res.render(path.join('products', 'productCart'), { empty, total })
    },
    addToCart: (req, res) => {
        let empty
        var exist = false;
        let products = fileController.openFile(productsJson)
        if (req.session.cart == undefined) {
            req.session.cart = [];
            req.session.total = 0;
            req.session.cartIDs = []
        }
        req.session.cart.forEach(element => {
            if (element.id == req.body.id) {
                exist = true;
                element.counter += Number(req.body.counter);
                req.session.total += req.body.counter * element.price
            }
        });
        if (!exist) {
            req.session.cartIDs.push(Number(req.body.id))
            req.session.cart.push({
                id: Number(req.body.id),
                counter: Number(req.body.counter),
                price: Number(req.body.price)
            })
            req.session.total += req.body.counter * req.body.price
        }
        let cart = req.session.cart
        let total = req.session.total
        req.session.cart = cart
        productsToShow = []
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            if (req.session.cartIDs.includes(element.id)) {
                productsToShow.push(element)
            }
        }
        res.render(path.join('..', 'views', 'products', 'productCart'), { productsToShow, cart, total, empty })
    },
    delete: (req, res) => {
        let products = fileController.openFile(productsJson)
        let filtrados

        for (let index = 0; index < products.length; index++) {
            let element = products[index];
            if (element.id == req.params.id) {
                filtrados = products.filter(function (i) {
                    return i != element
                })
            }
        }
        fileController.saveFile(filtrados, productsJson)
        res.redirect('/products')
    },
    search: (req, res) => {
        db.Products.findAll({
            where: {
                name: { [db.Sequelize.Op.like]: '%' + req.query.search + '%' }
            }
        })
            .then(function (products) {
                res.render(path.join('products', 'productList'), { products: products })

            })
            .catch()
    },
    category: (req, res) => {
        db.Products.findAll({
            where: {
                idVarietal: req.params.category
            }
        })
            .then(function (products) {
                res.render(path.join('products', 'productList'), { products: products })

            })
            .catch()
    }

}

module.exports = productController;