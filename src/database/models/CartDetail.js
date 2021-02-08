module.exports = (sequelize, dataTypes) => {
    const CartDetail = sequelize.define('CartDetail', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,

        } ,
        productQuantity: {
            type: dataTypes.INTEGER(255).UNSIGNED,
            allowNull: false
        } ,
        productPrice: {type: dataTypes.DECIMAL(7,2)},
        productId: {type: dataTypes.INTEGER.UNSIGNED},
        cartId: {type: dataTypes.INTEGER.UNSIGNED,},
        createdAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        updatedAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        deletedAt:{type: dataTypes.DATE, defaultValue: dataTypes.NULL} ,
    },{

    })

    CartDetail.associate = function(models){
        CartDetail.hasMany(models.Products,{
            as: "ProductsInCart",
            foreignKey: "id"
        })
        //CartDetail.belongsTo(models.Wineries,{
        //    as: "Wineries",
        //    foreignKey: "idWinery"
        //})
    }
    return CartDetail;
}