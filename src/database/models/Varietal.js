module.exports = (sequelize, dataTypes) => {
    const Varietal = sequelize.define('Varietals', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,

        } ,
        varietal: {
            type: dataTypes.STRING(150),
            allowNull: false
        } 
    })
    Varietal.associate = function(models){
        Varietal.hasMany(models.Products,{
            as: "Products",
            foreignKey: "idVarietal"
        })
    }
    return Varietal;
}