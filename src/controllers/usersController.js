let path = require('path');
let fs = require('fs');
let bcrypt = require('bcryptjs');//usar siempre BCRYPTJS
let filePath= path.join('src', 'data', 'users.json');
let users= JSON.parse(fs.readFileSync(filePath, {encoding:"utf-8"}));
const {check, validationResult, body} = require('express-validator');




const usersController= {
    indexRegister: (req, res) => {
        res.render('users/register')
    },

    save: (req,res) => {
      
      let id = null
        for (let i= 0; i < users.length; i++){
          id = id+1;
        }
        var newUser= {
          id:id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          category: req.body.category,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: 'avatar-default.png'
        };
        
        if(newUser.first_name == '' || newUser.last_name == '' || newUser.category == '' || newUser.email == '' || newUser.password == ''){
            res.send('No completo bien los campos')
        }else{

            //agrego el nuevo usuario en usuarios
            users.push(newUser)
            //combierto la variable users a string
            users= JSON.stringify(users)
            //sobreescribo el archivo con todos los usuarios mas el nuevo
            fs.writeFileSync(filePath, users)

            res.render('users/userCreate', {newUser: newUser})
        }

    },

    //acá empieza todo lo que tiene que ver con el login

    indexLogin: (req,res) => {
      res.render('users/login',{
        data: {},
        errors: []
      });
    },


    ingreso: (req,res) => {
      
      let validator = validationResult(req);
      if(validator.isEmpty()) { // en el IF pregunta si validator está vacia.  
        
      let user = {...users.find(user => user.email === req.body.email)}

      if (user != undefined){
        if(req.body.email == user.email && bcrypt.compareSync(req.body.password, user.password)){
          delete user.password; // borramos la password del objeto.
          req.session.users = user //creamos la session.users con los datos de users menos la pass.

          if(req.body.remember){
            res.cookie('usuario', users.email, { maxAge:1000 * 60 * 60})
            res.locals.usuario = req.session.users
          }
          res.redirect('/');
        }
      }
    }
        res.render('users/login',{
          errors: validator.mapped(),
          data: req.body
        })
      

    },


    changePassword: (req,res) =>{
      res.render('users/changePassword')
    },

    changePasswordSave: (req,res) =>{
      let email= req.body.email

      for (let i= 0; i< users.length; i++){
        if (email == users[i].email){
          res.render('users/changePasswordSave', {user: users[i]})
        }
      }
    },


    profile:(req,res) => {
      let id= req.params.id
      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);

      for (let i= 0; i< users.length; i++){
        if (id == users[i].id){
          res.render('users/userProfile', {user: users[i]})
        }
      }

    },

    profileEdit: (req,res) => {
      let id= req.params.id;
      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);


      for (let i= 0; i < users.length; i++){
        if (id == users[i].id){
          res.render('users/editProfile', {user: users[i]})
        }
      }

    },

    profileEditPatch: (req,res) => {
      let id= req.params.id;

      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);

      let user= users[id]
      let cambio;


      if (bcrypt.compareSync(req.body.password, user.password)){
        cambio= users.splice(user.id, 1, {
          id:user.id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          category: req.body.category,
          email: user.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: user.avatar
        })

        users= JSON.stringify(users)
        fs.writeFileSync(filePath, users)

        res.redirect('users/login')

      }else{
        res.send('No colocó bien su contraseña')
      }
    },

    profileEditAvatar: (req,res) => {
      let id = req.params.id

      let user= users[id]
      res.render('users/editAvatar', {user: user})
    },

    profileEditPatchAvatar: (req,res) => {
      let id = req.params.id
      let photoAvatar= req.file
      let user= users[id]
      let cambio;

        if(bcrypt.compareSync(req.body.password, user.password)){
          cambio= users.splice(user.id, 1, {
            id:user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            category: user.category,
            email: user.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: photoAvatar.filename
          })
          users= JSON.stringify(users)
          fs.writeFileSync(filePath, users)

          res.redirect('users/login')
        }else{
          res.send('no colocó bien su contraseña')
        }
    },

    profileEditPassword: (req,res) => {
      let id = req.params.id

      let user= users[id]
      res.render('users/editPassword', {user: user})
    },

    profileEditPatchPassword: (req,res) => {
      let id = req.params.id
      let user = users[id]
      let cambio;

      if (bcrypt.compareSync(req.body.password1, user.password)){
        if( req.body.password2 == req.body.password3){
          cambio= users.splice(user.id, 1, {
            id:user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            category: user.category,
            email: user.email,
            password: bcrypt.hashSync(req.body.password2, 10),
            avatar: user.avatar
          })

          users= JSON.stringify(users)
          fs.writeFileSync(filePath, users)

          res.redirect('users/login')
        }else{
          res.send('Colocó mal su nueva contraseña')
        }
      }else{
        res.send('Colocó mal su contraseña antigua')
      }
    },

    profileEditDelete: (req,res) => {
      let id= req.params.id;
      let user = users[id];

          res.render('users/userDelete', {user: user})
    },

    profileConfirmDelete: (req,res) => {
      let id= req.params.id;
      let eliminar;

      for (let i= 0; i < users.length; i++){
        if (id == users[i].id){
          eliminar = users.splice(id, 1)

          users= JSON.stringify(users)
          fs.writeFileSync(filePath, users)

          res.redirect('/')
        }
      }
    },

}


module.exports= usersController;
