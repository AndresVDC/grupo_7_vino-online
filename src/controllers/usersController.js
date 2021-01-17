let path = require('path');
let fs = require('fs');
let bcrypt = require('bcrypt');
let filePath= path.join('src', 'data', 'users.json');
let users= fs.readFileSync(filePath, {encoding:"utf-8"});
const {check, validationResult, body} = require('express-validator');

//combierto el archivo en objeto
users= JSON.parse(users)


const usersController= {
    indexRegister: (req, res) => {
        res.render(path.join('..', 'views', 'users', 'register.ejs'))
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

            res.render(path.join('..', 'views', 'users', 'userCreate.ejs'), {newUser: newUser})
        }

    },

    //acá empieza todo lo que tiene que ver con el login

    indexLogin: (req,res) => {
      res.render(path.join('users' ,'login.ejs'),{
        data: {},
        errors: []
      });
    },

    ingreso: (req,res) => {
      
      let validator = validationResult(req);
      if(!validator.isEmpty()) {
        
        let users= fs.readFileSync(filePath, {encoding:"utf-8"});
        users= JSON.parse(users);


      for (let i= 0; i < users.length; i++){
        if(req.body.email == users[i].email && bcrypt.compareSync(req.body.password, users[i].password)){
          res.render(path.join('users', 'buttom'), {user: users[i]})
        }
      }
        res.render(path.join('users' ,'login.ejs'),{
          errors: validator.mapped(),
          data: req.body
        })
      }
    
    },


    profile:(req,res) => {
      let id= req.params.id
      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);

      for (let i= 0; i< users.length; i++){
        if (id == users[i].id){
          res.render(path.join('users', 'userProfile'), {user: users[i]})
        }
      }

    },

    profileEdit: (req,res) => {
      let id= req.params.id;
      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);


      for (let i= 0; i < users.length; i++){
        if (id == users[i].id){
          res.render(path.join('users', 'editProfile'), {user: users[i]})
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

        res.redirect(path.join('users', 'login'))

      }else{
        res.send('No colocó bien su contraseña')
      }
    },

    profileEditAvatar: (req,res) => {
      let id = req.params.id

      let user= users[id]
      res.render(path.join('users', 'editAvatar'), {user: user})
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

          res.redirect(path.join('users', 'login'))
        }else{
          res.send('no colocó bien su contraseña')
        }
    },

    profileEditPassword: (req,res) => {
      let id = req.params.id

      let user= users[id]
      res.render(path.join('users', 'editPassword'), {user: user})
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

          res.redirect(path.join('users', 'login'))
        }else{
          res.send('Colocó mal su nueva contraseña')
        }
      }else{
        res.send('Colocó mal su contraseña antigua')
      }
    },

    profileEditDelete: (req,res) => {
      let id= req.params.id;
      let users= fs.readFileSync(filePath, {encoding:"utf-8"});
      users= JSON.parse(users);
      let eliminar;

      for (let i= 0; i < users.length; i++){
        if (id == users[i].id){
          eliminar = users.splice(id, 1)

          users= JSON.stringify(users)
          fs.writeFileSync(filePath, users)

          res.redirect(path.join('users', 'login'))
        }
      }

    },

}


module.exports= usersController;