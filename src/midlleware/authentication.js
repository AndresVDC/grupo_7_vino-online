module.exports = (req, res, next) =>{
    res.locals.user= false;

    if(req.session.users){

        res.locals.user = req.session.users

    } else if (req.cookies.users){
        
        req.session.user = req.cookies.usuario;
        res.locals.user = req.cookies.usuario;

    }
    next()
}