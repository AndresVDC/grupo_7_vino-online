
const express = require ('express');
const fs = require ('fs');
const path = require ('path')
const baseUsuarios = path.join(__dirname, "..", "data", "usuarios.json")

const usersController ={
vista: function (req,res) {
    res.render('users/register',)
  },
create: function (req, res) {

    let usuario = {
        firtName: req.body.name,
        lastName: req.body.surname,
        email: req.body.email,
        age: req.body.years,
        password: req.body.password
    }
    let archivoUsuarios = fs.readFileSync(baseUsuarios, {encoding: 'UTF-8'})
        
    let usuarios;

    if (archivoUsuarios == ""){
        usuarios=[];
    } else {
        usuarios= JSON.parse(archivoUsuarios);
    }
    usuarios.push(usuario);
    
    usuariosJSON = JSON.stringify(usuarios);

    fs.writeFileSync(baseUsuarios, usuariosJSON);


    res.redirect('/',)
}

}

module.exports = usersController;
