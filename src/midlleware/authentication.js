module.exports = (req, res, next) =>{
    res.locals.user= false;

    if(req.session.users){

        res.locals.user = req.session.users

    } else if (req.cookies.remember){
        
        req.session.users = req.cookies.remember;
        res.locals.user = req.cookies.remember;

    }
    next()
}