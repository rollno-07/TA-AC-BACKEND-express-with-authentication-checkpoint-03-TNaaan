var User=require('../models/users');

module.exports={
    loggedInUser:(req,res,next)=>{
        if(req.session&& req.session.userId){
            next()
        }
        else{
            res.redirect('users/login');
        }
    
    },
    userInfo:(req,res,next)=>{
        var userId=req.session&& req.session.userId;
        if(userId){
            User.findById(userId,"name email",(err,user)=>{
                if(err) return next(err)
                req.user=user;
                req.local.user=user;
                next()
            })

        }
        else{
           req.user=null;
           req.local.user=null;
           next(); 
        }
    }

}