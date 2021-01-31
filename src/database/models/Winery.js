module.exports = (sequelize, dataTypes) => {
    const Winery = sequelize.define('Wineries', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,

        } ,
        name: {
            type: dataTypes.STRING(150),
            allowNull: false
        } 
    })
    Winery.associate = function(models){
        Winery.hasMany(models.Products,{
            as: "Products",
            foreignKey: "idWinery"
        })
    }
    return Winery;
}