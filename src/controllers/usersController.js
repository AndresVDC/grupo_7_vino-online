let path = require('path');
let fs = require('fs');
let bcrypt = require('bcryptjs');//usar siempre BCRYPTJS
let filePath= path.join('src', 'data', 'users.json');
let users= JSON.parse(fs.readFileSync(filePath, {encoding:"utf-8"}));
const {check, validationResult, body} = require('express-validator');
// requerimos SEQUELIZE MODELS
const db = require('../database/models');



const usersController= {
    indexRegister: (req, res) => {
        res.render('users/register')
    },

    save: (req,res) => {
      let errors = validationResult(req);

      if(errors.isEmpty()){
      //SEQUELIZE MODELS
      db.users.findOne( {where:{email:req.body.email}})
        .then((data)=>{
                  if(data == null){
                          db.users.create({
                            firstName: req.body.first_name,
                            lastName: req.body.last_name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                            category: req.body.category,
                            avatar: 'avatar-default.png'
                          })
                        .then((datos)=>{
                          req.session.users= {
                            firstName: req.body.first_name,
                            lastName: req.body.last_name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                            category: req.body.category,
                          }
                          res.locals.user = req.session.users
                          /*console.log(data)
                          res.send('entro en el if')*/
                          res.redirect('/') 
                        })
                        .catch((err)=>{
                          res.send(err)
                        })
                  }else{
                    /*console.log(data)    
                    res.send('fue al else')*/
                        res.render('users/register',{errors:errors.mapped(), data: req.body})
                  }
        })
        .catch((err)=>{
          res.send(err)
        })
      }else{
        res.render('users/register', {errors:errors.mapped(), data: req.body})
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
      
      db.users.findOne({where:{email: req.body.email}})
      .then((user)=> {
       const pass =bcrypt.compareSync(req.body.password, user.password)
        if(pass){
          req.session.users = user
          if(req.body.remember){
            res.cookie('remember', req.session.users, {maxAge: 1000 * 60 * 60})
          }
          res.redirect('/')
        }else{
          res.render('users/login')
        }
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
