let path = require('path'); 
let fs = require('fs');
let bcrypt = require('bcryptjs');//usar siempre BCRYPTJS
const { check, validationResult, body } = require('express-validator');
// requerimos SEQUELIZE MODELS
const db = require('../database/models');



const usersController = {
  indexRegister: (req, res) => {
    res.render('users/register', {
      registeredUser:"",
      data: {},
      errors: []
    })
  },

  save: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      //SEQUELIZE MODELS
      //Se crea un carrito para el usuario
      db.Carts.create().then((dbcart) => {
        //Se verifica que el email no este registrado
        db.users.findOne({ where: { email: req.body.email } })
        .then((data) => {
          if (data == null) {
            //Se crea el usuario y se le asigna su numero de carrito con dbcart.id
            db.users.create({
              firstName: req.body.first_name,
              lastName: req.body.last_name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              category: req.body.category,
              avatar: 'avatar-default.png',
              idCart: dbcart.id
            })
              .then((datos) => { res.redirect('login') })
              .catch((err) => { res.send(err) })
          } else {
            registeredUser = req.body.email // Para usar con errores cuando el usuario ya existe en BD
            return res.render('users/register', { errors: errors.mapped(), data: req.body, registeredUser })
          }
        })
        .catch((err) => { res.send(err) })

      }).catch((err) => {
        console.log(err)
      })
      
    } else {
      res.render('users/register', { errors: errors.mapped(), data: req.body })
    }


  },

  //acá empieza todo lo que tiene que ver con el login

  indexLogin: (req, res) => {
    res.render('users/login', {
      data: {},
      errors: []
    });
  },


  ingreso: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {

      // SEQUELIZE MODELS
      db.users.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user){
          if(bcrypt.compareSync(req.body.password, user.password)){
            
            req.session.users = {...user['dataValues'], password:''}
            if (req.body.remember) {
              res.cookie('remember', req.session.users, { maxAge: 1000 * 60 * 60 })
              
            }
            res.redirect('/')
          }else{
            let errorPass = "La password ingresada no es valida."
          res.render('users/login', { errorPass, data: req.body, errors })
          }
        }else{
          let errorEmail = "El e-mail no está registrado."
          res.render('users/login', { errorEmail, data: req.body, errors })
        }
      })
    } else {
        res.render('users/login', { errors: errors.mapped(), data: req.body })
    }
  },


  changePassword: (req, res) => {
    res.render('users/changePassword')
  },

  changePasswordSave: (req, res) => {
    db.users.findOne(
      {
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        res.render('users/changePasswordSave', { user: user })
      })
      .catch((err) => {
        res.send(err)
      })
  },


  profile: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {
        res.render('users/userProfile', { user: user })
      })
      .catch((err) => {
        console.log(err)
        res.render('somethingWrong')
      })

  },

  profileEdit: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {

        res.render('users/editProfile', { user: user, errors: []})
      })
      .catch((err) => {
        console.log(err)
        res.render('somethingWrong')
      })

  },

  profileEditPatch: (req, res) => {
    db.users.findByPk(req.params.id)
    .then(user => {

      let errors = validationResult(req);

    if (errors.isEmpty()) {

      if (req.body.first_name){

        if(req.body.last_name){

          db.users.update({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            category: req.body.category
          }, {
            where: {
              id: req.params.id
            }
          })
          return res.redirect('/users/profile/' + req.params.id)

        }
      }else{
        let errorName = 'Debe completar este campo'
        res.render('users/editProfile', {errorName, user: user})
      }

      

    }else {
        res.render('users/editProfile', { errors: errors.mapped(), user: user})
    }
      
    }) 

  },

  profileEditAvatar: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {
        res.render('users/editAvatar', { user: user, data: {}, errors: [] })
      })
      .catch((err) => {
        res.send(err)
      })
  },

  profileEditPatchAvatar: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {
        console.log(req.files)
    //res.send(req.files)
    if (typeof req.file != "undefined") {
      db.users.update({
        avatar: req.file.filename
      }, {
        where: {
          id: req.params.id
        }
      })
        .then(avatars => {
          res.redirect('/users/profile/' + req.params.id)
        })
    } else {
      return res.render('users/editAvatar', { errorImage: "selecciona una imagen", user: user })
    }
      })
  },

  profileEditPassword: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {
        res.render('users/editPassword', { user: user, passErrors: [] })
      })
  },

  profileEditPatchPassword: (req, res) => {
    
    db.users.findByPk(req.params.id)
    .then(user => {
      let passErrors = validationResult(req);

    if (passErrors.isEmpty()) {
            db.users.findByPk(req.params.id)
            .then(user =>{
              if(bcrypt.compareSync(req.body.password1, user.password) && (req.body.password2 == req.body.password3)){
                db.users.update({
                  password: bcrypt.hashSync(req.body.password2)
                }, {
                  where: {
                    id: req.params.id
                  }
                }).then(patchPass => {
                  return res.redirect('/users/profile/' + req.params.id)
                })
                .catch((err) => {res.send(err)})
              }else{
                //return res.send('no paso el segundo if')
                let errorPass = "La password ingresada no es valida."
                return res.render('users/editPassword',{errorPass})
              }
              })
              .catch((err) => {res.send(err)})
      }else{
        return res.render('users/editPassword', {passErrors : passErrors.mapped(), user:user})
      }
    })
  },

  logout: (req, res) => {
    res.clearCookie('remember');
    req.session.destroy();
    res.redirect('/')
  }
}


module.exports = usersController;
