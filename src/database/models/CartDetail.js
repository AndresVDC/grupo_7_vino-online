module.exports = (sequelize, dataTypes) => {
    const CartDetail = sequelize.define('CartDetail', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false
        } ,
        productQuantity: {
            type: dataTypes.INTEGER(255).UNSIGNED,
            allowNull: true
        } ,
        productPrice: {type: dataTypes.DECIMAL(7,2)},
        createdAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        updatedAt: {type: dataTypes.DATE, defaultValue: dataTypes.NOW},
        deletedAt:{type: dataTypes.DATE, defaultValue: dataTypes.NULL} ,
    })
   return CartDetail;
}