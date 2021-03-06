module.exports = {
    logueado: function (req, res, next) {
        if (req.session.users){

            return res.redirect('/')

        } else {
            next()
        }
    },
    loggedOut: (req,res,next) => {
        //metodo para validar que no hay usuario logueado y evita el acceso a rutas restringidas.
        (!req.session.users)?res.redirect('/users/login'):next()
    }

}