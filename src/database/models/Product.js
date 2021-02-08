module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,

        } ,
        name: {
            type: dataTypes.STRING(150),
            allowNull: false
        } ,
        score: {type: dataTypes.INTEGER(5).UNSIGNED} ,
        price: {type: dataTypes.DECIMAL(7,2)},
        detail: {
            type: dataTypes.STRING(512),
            allowNull: false
        },
        image: {type: dataTypes.STRING(150)},
        category: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        discount: {type: dataTypes.INTEGER(99).UNSIGNED},
        presentation: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        idVarietal: {type: dataTypes.INTEGER(200).UNSIGNED},
        idWinery: {type: dataTypes.BIGINT.UNSIGNED,},
        createdAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        updatedAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        deletedAt:{type: dataTypes.DATE, defaultValue: dataTypes.NULL} ,
    },{

    })

    Product.associate = function(models){
        Product.belongsTo(models.Varietals,{
            as: "Varietals",
            foreignKey: "idVarietal"
        }),
        Product.belongsTo(models.Wineries,{
            as: "Wineries",
            foreignKey: "idWinery"
        })
        Product.belongsToMany(models.Carts,{
            as: "cart",
            through: "cartDetails",
            foreignKey: "productId",
            otherKey: "cartId",
            
        })
    }
    return Product;
}