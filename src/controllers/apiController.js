const db = require('../database/models');
const apiController = {
    //Responde la lista de productos mediante API con un formato JSON
    products: (req, res) => {
        db.Products.findAll()
            .then(function (products) {
                let category = [];
                for (let index = 0; index < products.length; index++) {
                    category.push(products[index].category)
                    products[index].setDataValue("endpoint", "/api/products/" + products[index].id);
                }
                let answer = {
                    meta: {
                        status: "OK",
                        count: products.length,
                        countByCategory: { 
                            tinto: category.filter(x => x=='Tinto').length,
                            blanco: category.filter(x => x=='Blanco').length,
                            espumante: category.filter(x => x=='Espumante').length,
                            espirituoso: category.filter(x => x=='Espirituoso').length
                        }
                    },
                    data: products,
                }
                res.json({ answer })
            })
            .catch((error) => {
                console.log(error)
                res.json({meta: {status: "204 - Producto no encontrado"}})
            })
    },
    //Responde el detalle del producto mediante API con un formato JSON
    productDetails: (req,res) => {
        db.Products.findByPk(req.params.id)
            .then((product) => {
                if (product != null) {
                    res.json({ product: product})
                }
                else {
                   res.json({meta: {status: "204 - Producto no encontrado"}})
                }
            }
            )
    },
    //Responde la lista de usuarios mediante API con un formato JSON
    users:(req,res) =>{

    },
    //Responde el detalle del usuario mediante API con un formato JSON
    userDetails: (req,res) => {

    }
}

module.exports = apiController;