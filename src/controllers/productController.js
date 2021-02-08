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
                res.render('../views/products/productList', { products: products })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    create: (req, res) => {
        db.Varietals.findAll()
            .then(function (varietals) {
                res.render('../views/products/formProduct', { errors: {}, nuevoProducto: {}, varietals: varietals })
            })
            .catch((error) => {
                res.send(error)
            })
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
            productCategory: req.body.productCategory,
            idVarietal: req.body.productVarietal
        }

        //Detección de errores
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('../views/products/formProduct', { errors: errors.mapped(), nuevoProducto: nuevoProducto, varietals: {} })
        }
        db.Products.create({
            name: req.body.productName,
            score: req.body.productScore,
            price: req.body.productPrice,
            detail: req.body.productDetail,
            image: "/images/" + req.files[0].filename,
            discount: req.body.productDiscount,
            presentation: req.body.productPresentation,
            category: req.body.productCategory,
            idVarietal: req.body.productVarietal,
            idWinery: 1
        })
            .then(
                res.redirect('/products')
            )
            .catch((error) => {
                res.send(error)
            })
    },
    detail: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then((product) => {
                if (product != null) {
                    db.Products.findAll({
                        where: { category: product.category },
                        limit: 4,
                        order: db.sequelize.random()
                    })
                        .then((related) => {
                            res.render('../views/products/productDetail', { product: product, related: related })
                        })
                        .catch((error) => {
                            res.send(error)
                        })

                }
                else {
                    res.send("El detalle del producto al que intenta acceder no existe.")
                }
            }
            )

            .catch((error) => {
                res.send(error)
            })
    },
    edit: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function (product) {
                if (product != null) {
                    res.render('../views/products/productEdit', { product: product, errors: {} })
                }
                else {
                    res.send("El producto que intenta modificar es inexistente.")
                }
            })
            .catch((error) => {
                console.log(error)
                res.send(error)
            })
    },
    actualizar: (req, res) => {
        //Obetener el producto de la DB
        db.Products.findByPk(req.params.id)
            .then(function (product) {
                //Detección de errores
                let errors = validationResult(req);
                //Si existen errores evitar edición y mostrarlos en HTML.
                if (!errors.isEmpty()) {
                    return res.render('../views/products/productEdit', { errors: errors.mapped(), product: product })
                }
                //Si no hay errores se procede con la edición del producto en la DB
                else {
                    db.Products.update({
                        name: req.body.productName,
                        score: req.body.productScore,
                        price: req.body.productPrice,
                        detail: req.body.productDetail,
                        //image: "/images/" + req.files[0].filename,
                        discount: req.body.productDiscount,
                        presentation: req.body.productPresentation,
                        category: req.body.productCategory,
                        idVarietal: req.body.productVarietal,
                        idWinery: 1
                    },
                        {
                            where: { id: req.params.id }
                        })
                        .then(
                            res.redirect('/products/' + req.params.id)
                        )
                        .catch((error) => {
                            res.send("Error en update a la DB " + error)
                        })
                }
            })
            .catch((error) => {
                res.send("Error en obtener el producto de la DB " + error)
            })
    },
    cart: (req, res) => {
        if (!req.session.cart) {
            let empty = true
            let total = 0
            res.render('../views/products/productCart', { empty, total })
        }
        else {
            db.Carts.findByPk(req.session.cartId,{include: [{association: "product"}]})
                .then(products => {
                    let empty = false
                    total = req.session.total
                    console.log(products.totalPrice)
                    res.render('../views/products/productCart', { empty, total, products: products})
                })
                .catch((error) => {
                    res.send("Error en leer productos de la DB para mostrar carrito " + error)
                })
        }
    },
    addToCart: (req, res) => {
        let empty
        var exist = false;
        //let products = fileController.openFile(productsJson)
        if (req.session.cart == undefined) {
            req.session.cart = [];
            req.session.cartId = 1 //locals.user.id
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
        //let cart = req.session.cart
        //let total = req.session.total
        //req.session.cart = cart
        console.log(req.session.cart)
        //db.Carts.create({
         //   quantityOfProducts: ,
         //   totalPrice: ,
         //   userId:
       // })
        //productsToShow = []
        //for (let index = 0; index < products.length; index++) {
        //    const element = products[index];
        //    if (req.session.cartIDs.includes(element.id)) {
        //        productsToShow.push(element)
        //    }
        //}
        res.render('../views/products/productCart', { productsToShow, cart, total, empty })
    },
    delete: (req, res) => {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products')
    },
    search: (req, res) => {
        db.Products.findAll({
            where: {
                name: { [db.Sequelize.Op.like]: '%' + req.query.search + '%' }
            }
        })
            .then(function (products) {
                res.render('../views/products/productList', { products: products })

            })
            .catch()
    },
    category: (req, res) => {
        db.Products.findAll({
            where: {
                category: req.params.category
            }
        })
            .then(function (products) {
                res.render('../views/products/productList', { products: products })

            })
            .catch()
    }

}

module.exports = productController;