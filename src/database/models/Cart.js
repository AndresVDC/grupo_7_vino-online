module.exports = (sequelize, dataTypes) => {
    const Cart = sequelize.define('Carts', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,

        } ,
        quantityOfProducts: {
            type: dataTypes.INTEGER(255).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        } ,
        totalPrice: {
            type: dataTypes.DECIMAL(7,2),
            defaultValue: 0
        },
        createdAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        updatedAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        deletedAt:{type: dataTypes.DATE, defaultValue: dataTypes.NULL} ,
    },{

    })

    Cart.associate = function(models){
        Cart.belongsToMany(models.Products,{
            as: "product",
            through: models.CartDetail,
            foreignKey: "cartId",
            otherKey: "productId"
        })
        //Cart.belongsTo(models.users,{
        //    as: 'Users',
        //    foreignKey: "userId",
        //    })
        //
        //CartDetail.belongsTo(models.Wineries,{
        //    as: "Wineries",
        //    foreignKey: "idWinery"
        //})
    }
    return Cart;
}