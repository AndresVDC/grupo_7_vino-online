const { validationResult } = require('express-validator')
const path = require('path')
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
        //Si el usuario no esta logueado se redirige a login.
        if (!res.locals.user.id) {
            res.redirect('../users/login')
        }
        else {
            //En primer lugar se busca cual es el ID del carrito que pertenece al usuario.
            db.Carts.findOne({
                where: {
                    userId: res.locals.user.id
                }
            }).then(returnedCart => {
                //En segundo lugar se efectua una query para traer ese carrito con sus asociaciones
                db.Carts.findByPk(returnedCart.id, { include: [{ association: "product" }] })
                    .then(products => {
                        res.render('../views/products/productCart', {
                            empty: products.quantityOfProducts == 0,
                            total: products.totalPrice,
                            products
                        })
                    })
                    .catch((error) => {
                        res.send("Error en leer productos de la DB para mostrar carrito " + error)
                    })
            })
        }
    },
    addToCart: (req, res) => {
        //En primer lugar se busca cual es el ID del carrito que pertenece al usuario.
        if (res.locals.user.id) {
            db.Carts.findOne({
                where: {
                    userId: res.locals.user.id
                }
            }).then(returnedCart => {
                //En segundo lugar se efectua una query para traer ese carrito con sus asociaciones
                db.Carts.findByPk(returnedCart.id)
                    .then(products => {
                        //Agregado del producto, cantidad y precio en la tabla cartDetails.
                        products.addProduct(Number(req.body.id), {
                            through: {
                                productQuantity: req.body.counter,
                                productPrice: req.body.price
                            }
                        })
                        let quantityOfProducts = Number(products.quantityOfProducts) + Number(req.body.counter);
                        let totalPrice = Number(products.totalPrice) + Number(req.body.price);
                        db.Carts.update({
                            quantityOfProducts: quantityOfProducts,
                            totalPrice: totalPrice
                        },
                            {
                                where: { id: products.id }
                            })
                    })
                res.redirect('../products/productCart')
            })
                .catch((error) => {
                    res.send("Error al agregar el producto al carrito: " + error)
                })
        }
        else{
        res.redirect('../users/login')
    }
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