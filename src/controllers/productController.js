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
                console.log(error)
                res.render('somethingWrong')
            })
    },
    create: (req, res) => {
        db.Varietals.findAll()
            .then(function (varietals) {
                res.render('../views/products/formProduct', { errors: {}, nuevoProducto: {}, varietals: varietals })
            })
            .catch((error) => {
                console.log(error)
                res.render('somethingWrong')
            })
    },
    save: (req, res) => {
        let nuevoProducto = {
            productName: req.body.productName,
            productScore: req.body.productScore,
            productPrice: req.body.productPrice,
            productDetail: req.body.productDetail,
            img: req.files[0] != undefined ? "/images/" + req.files[0].filename : "",
            //img: "/images/" + req.files[0].filename,
            productDiscount: req.body.productDiscount,
            productPresentation: req.body.productPresentation,
            productCategory: req.body.productCategory,
            idVarietal: req.body.productVarietal
        }
        //Detección de errores
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Products.create({
                name: req.body.productName,
                score: req.body.productScore,
                price: req.body.productPrice,
                detail: req.body.productDetail,
                image: req.files[0] != undefined ? "/images/" + req.files[0].filename : "",
                //image: "/images/" + req.files[0].filename,
                discount: req.body.productDiscount,
                presentation: req.body.productPresentation,
                category: req.body.productCategory,
                idVarietal: req.body.productVarietal,
                idWinery: 1
            })
                .then(result => {
                    res.redirect('/products/' + result.id)
                })
                .catch((error) => {
                    console.log(error)
                    res.render('somethingWrong')
                })
            }
        else {
            db.Varietals.findAll()
                .then(function (varietals) {
                    return res.render('../views/products/formProduct', { errors: errors.mapped(), nuevoProducto: nuevoProducto, varietals: varietals })
                })
                .catch((error) => {
                    console.log(error)
                    res.render('somethingWrong')
                })
        }

    },
    detail: (req, res) => {
        let id = req.params.id
        db.Products.findByPk(id)
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
                            console.log(error)
                            res.render('somethingWrong')
                        })

                }
                else {
                    console.log('***********************')
                    console.log('SE INTENTO ACCEDER AL PRODUCTO CON ID ' + id + ', EL MISMO NO EXISTE.')
                    console.log('***********************')
                    res.render('somethingWrong')
                }
            }
            )

            .catch((error) => {
                console.log(error)
                res.render('somethingWrong')
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
                res.render('somethingWrong')
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
                            console.log(error)
                            res.render('somethingWrong')
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                res.render('somethingWrong')
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
                        console.log(error)
                        res.render('somethingWrong')
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
                console.log(error)
                res.render('somethingWrong')
            })
        }
        else {
            res.redirect('../users/login')
        }
    },
    removeFromCart: (req, res) => {
        db.Carts.findOne({
            where: {
                userId: res.locals.user.id
            }
        }).then(returnedCart => {
            //En segundo lugar se efectua una query para traer ese carrito con sus asociaciones
            db.Carts.findByPk(returnedCart.id)
                .then(products => {
                    //Remueve el  producto, cantidad y precio en la tabla cartDetails.
                    products.removeProduct(Number(req.params.id))
                    let quantityOfProducts = Number(products.quantityOfProducts) - Number(req.body.removeFromCart);
                    let totalPrice = Number(products.totalPrice) - Number(req.body.removePrice);
                    db.Carts.update({
                        quantityOfProducts: quantityOfProducts,
                        totalPrice: totalPrice
                    },
                        {
                            where: { id: products.id }
                        })
                })
            res.redirect('/products/productCart')
        })
        .catch((error) => {
            console.log(error)
            res.render('somethingWrong')
        })
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
            .catch((error) => {
                console.log(error)
                res.render('somethingWrong')
            })
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
            .catch((error) => {
                console.log(error)
                res.render('somethingWrong')
            })
    }

}

module.exports = productController;