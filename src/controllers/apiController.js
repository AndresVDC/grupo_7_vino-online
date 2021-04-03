const db = require('../database/models');
const apiController = {
    //Responde la lista de productos mediante API con un formato JSON
    products: async (req, res) => {
        //Verifica si se recibe un número de página.
        if (req.params.pag == undefined) {
            page = 1
        }
        else {
            page = Number(req.params.pag)
        }
        //se almacena el total de productos por category
        const countByCategory =
            await Promise.all([
                db.Products.count({ where: { category: 'Tinto' } }),
                db.Products.count({ where: { category: 'Blanco' } }),
                db.Products.count({ where: { category: 'Espumante' } }),
                db.Products.count({ where: { category: 'Espirituoso' } }),
            ]).then(values => {
                let countByCategory = {
                    tinto: values[0],
                    blanco: values[1],
                    espumante: values[2],
                    espirituoso: values[3]
                }
                return countByCategory;
            }).catch(error => {
                console.log(error)
            })
        //Se guarda el total de productos.
        const count = await db.Products.count().then(value => {
            return value;
        }).catch(error => {
            console.log(error)
        })
        //se hace la consulta a la db con un limite de 10 productos y un offset basado en el N° de página.
        const data = await db.Products.findAll({limit: 10, offset: (10*(page-1))}).then(products => {
            for (let index = 0; index < products.length; index++) {
                products[index].setDataValue("endpoint", "/api/products/" + products[index].id);
            }
            return products;
        }).catch(error => { console.log(error) })

        //Se confeccionan los links de nexy y previous.
        let next = data.length == 10 ? `http://localhost:3001/api/products/page=${page + 1}` : null;
        let previous = page == 1 ? null : `http://localhost:3001/api/products/page=${page - 1}`;

        //Se construye la respuesta.
        let answer = {
            meta: {
                count: count,
                countByCategory: countByCategory,
                next: next,
                previous: previous
            },
            data: data
        }
        res.json( answer )
    },
    //Responde el detalle del producto mediante API con un formato JSON
    productDetails: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then((product) => {
                if (product != null) {
                    res.json({ product: product })
                }
                else {
                    res.json({ meta: { status: "204 - Producto no encontrado" } })
                }
            }
            )
    },
    //Responde la lista de usuarios mediante API con un formato JSON
    users: (req, res) => {
        db.users.findAll()
        .then(user =>{
            user = user.map(user=> user = {
                                    id: user.id, 
                                    firstName: user.firstName, 
                                    email: user.email, 
                                    category: user.category
                })
        
        let answer = {
            meta : {
                status : 200,
                count : user.length,
                url : `/api/users/`
            },
                data : user
            }
       
            res.json(answer)
        })
    },
    //Responde el detalle del usuario mediante API con un formato JSON
    userDetails: (req, res) => {
        {
            db.users.findAll({
                where : [{
                    id : req.params.id
                }]
            })
            .then(User => {
                
                User = User.map(User => User = {
                                                id : User.id , 
                                                firstName : User.firstName, 
                                                lastName: User.lastName, 
                                                email : User.email, 
                                                avatar: User.avatar 
                            }) 
                delete User.password;
                let answer= {
                    meta : {
                        status : 200,
                        url : `/api/users/${req.params.id}`
                    },
                    data : User,
                    urlAvatar: "Aun no lo logré hacer"
                }
               
               res.json(answer)
                               
            })
        }        
    }
}

module.exports = apiController;