module.exports = (req, res, next) =>{
    res.locals.user= false;

    if(req.session.users){

        res.locals.user = req.session.users

    } else if (req.cookies.users){
        
        req.session.users = req.cookies.users;
        res.locals.user = req.cookies.users;

    }
    next()
}