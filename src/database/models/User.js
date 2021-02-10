module.exports = (sequelize, dataTypes)=>{
let alias = "users";
let cols ={
    id:{
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT,
        allowNull:false
    },
    firstName: {
        type: dataTypes.STRING(150),
        allowNull:false
    },
    lastName:{
        type: dataTypes.STRING(150),
        allowNull:false
    },
    email:{
        type: dataTypes.STRING(200),
        allowNull:false
    },
    password:{
        type: dataTypes.STRING(200),
        allowNull:false
    },
    avatar:{
        type: dataTypes.STRING(200),
        allowNull:false
    },
    identityDocument:{
        type: dataTypes.STRING(200),
        
    },
    category:{
        type: dataTypes.STRING(45),
        allowNull:false
    },
    createdAt:{
        type: dataTypes.DATE, 
        defaultValue: dataTypes.NOW
    },
    updatedAt:{
        type: dataTypes.DATE, 
        defaultValue: dataTypes.NOW
    },
    deletedAt:{
        type: dataTypes.DATE,
        defaultValue: dataTypes.NULL
    }
}
let config = {
    tableName: "users",
    timestamps: true
}
let user = sequelize.define(alias, cols, config);

/*
User.associate = function(models){
    User.belongsTo(models.Cart,{
        as: 'Carts',
        foreignKey: "userId",
    })
}
*/

return user;
}