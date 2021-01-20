const { validationResult } = require('express-validator')
const path = require('path')
const fileController = require(path.join('..', 'controllers', 'fileController'))
//variable en la que se declara el archivo producto.
let productsJson = path.join('src', 'data', 'products.json')
const productController = {
    productList: (req, res) => {
        let products = fileController.openFile(productsJson)
        res.render(path.join('products', 'productList'), { products: products })
    },
    create: (req, res) => {
        res.render(path.join('products', 'formProduct'), { errors: {}, nuevoProducto: {} })
    },
    save: (req, res) => {
        let products = fileController.openFile(productsJson)
        //función que busca y asigna el primer ID libre.
        function findFreeId(products) {
            let freeId = "";
            let counter = 1;
            if (products[0] == undefined) {
                freeId = counter;
            }
            else {
                products.forEach(element => {
                    if (element.id == counter) {
                        counter++;
                        freeId = counter;
                    }
                    else {
                        freeId = counter;
                    }
                });

            }
            return freeId;
        }
        //crea el nuevo producto que luego se agrega en el Array.
        let nuevoProducto = {
            id: findFreeId(products),
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

        products.push(nuevoProducto)
        fileController.saveFile(products, productsJson)
        res.redirect('/products')
    },
    detail: (req, res) => {
        let products = fileController.openFile(productsJson)
        let produtId = req.params.id
        let productsRel = []

        //Busca y devuelve el indice del producto
        function findProductIndex(array) {
            let result = -1
            array.forEach(element => {
                if (element.id == produtId) {
                    result = array.indexOf(element)
                }
            });
            return result;
        }
        let product = findProductIndex(products)
        products.forEach(element => {
            if (element.productCategory == products[product].productCategory) {
                productsRel.push(element)
            }
        });
        if (productsRel.length < 4) {
            for (let index = productsRel.length; index < 4; index++) {
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
                productsRel.push(nuevoProducto)
            }
        }
        //Este IF se encarga de evitar el acceso a productos inexistentes.
        if (product == -1) {
            res.send("Producto inexistente!")
        }
        else {
            product = products[findProductIndex(products)]
            res.render(path.join('products', 'productDetail'), { product: product, productsRel: productsRel })
        }
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
        res.render(path.join('products', 'productCart'))
    },
    addToCart: (req, res) => {
        var cart = req.body
        req.session.cart = cart
        console.log(req.session.cart);
        res.render(path.join('..', 'views', 'products', 'productCart'))
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
        let products = fileController.openFile(productsJson)
        let busqueda = req.query.search.toLowerCase()
        let results = []
        products.forEach(element => {
            if (element.productName.toLowerCase().includes(busqueda)) {
                results.push(element)
            }
        });
        products = results
        res.render(path.join('products', 'productList'), { products: products })
    },
    category: (req, res) => {
        let products = fileController.openFile(productsJson)
        let Category = req.params.category
        let results = []
        products.forEach(element => {
            if (element.productCategory.includes(Category)) {
                results.push(element)
            }
        });
        products = results
        res.render(path.join('products', 'productList'), { products: products })
    }

}

module.exports = productController;