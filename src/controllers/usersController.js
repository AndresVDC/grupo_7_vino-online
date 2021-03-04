let path = require('path');
let fs = require('fs');
let bcrypt = require('bcryptjs');//usar siempre BCRYPTJS
let filePath = path.join('src', 'data', 'users.json');
let users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
const { check, validationResult, body } = require('express-validator');
// requerimos SEQUELIZE MODELS
const db = require('../database/models');



const usersController = {
  indexRegister: (req, res) => {
    res.render('users/register', {
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
              .then((datos) => { res.redirect('/') })
              .catch((err) => { res.send(err) })
          } else {
            registeredUser = req.body.email // Para usar con errores cuando el usuario ya existe en BD
            return res.render('users/register', { errors: errors.mapped(), data: req.body })
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
          const pass = bcrypt.compareSync(req.body.password, user.password)
          if (pass) {
            req.session.users = user
            if (req.body.remember) {
              res.cookie('remember', req.session.users, { maxAge: 1000 * 60 * 60 })
              res.locals.user = req.session.users
            }
            res.redirect('/')
          } else {
            let errorPass = "La password ingresada no es valida."
            res.render('users/login', { errorPass, data: req.body, errors })
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

  },

  profileEdit: (req, res) => {
    db.users.findByPk(req.params.id)
      .then(user => {

        res.render('users/editProfile', { user: user })
      })

  },

  profileEditPatch: (req, res) => {
    db.users.update({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      category: req.body.category,
    }, {
      where: {
        id: req.params.id
      }
    })

    res.redirect('/users/profile/' + req.params.id)
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
      return res.render('users/editAvatar', { errorImage: "selecciona una imagen" })
    }
  },

  profileEditPassword: (req, res) => {
    db.users.finddByPk(req.params.id)
      .then(user => {
        res.render('users/editPassword', { user: user })
      })
  },

  profileEditPatchPassword: (req, res) => {
    db.users.findByPk(req.params.id)
    let id = req.params.id
    let user = users[id]
    let cambio;

    if (bcrypt.compareSync(req.body.password1, user.password)) {
      if (req.body.password2 == req.body.password3) {
        cambio = users.splice(user.id, 1, {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          category: user.category,
          email: user.email,
          password: bcrypt.hashSync(req.body.password2, 10),
          avatar: user.avatar
        })

        users = JSON.stringify(users)
        fs.writeFileSync(filePath, users)

        res.redirect('users/login')
      } else {
        res.send('Colocó mal su nueva contraseña')
      }
    } else {
      res.send('Colocó mal su contraseña antigua')
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/')
  }
}


module.exports = usersController;
