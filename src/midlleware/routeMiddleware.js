module.exports = {
    logueado: function (req, res, next) {
        if (req.session.users){

            return res.redirect('/')

        } else {
            next()
        }
    }

}