import User from '../models/users';
import jwt  from 'jsonwebtoken';

module.exports= async (req,res,next)=>{
    
    req.auth =false;
    try{
        const header=req.header('auth');
        const decoded= await jwt.verify(header,`${process.env.SECRET_DONT_TELL}`);
        const user = await User.findById(decoded._id);
        if(!user){
          req.auth=false
          return next()
        }
        req.userId=user.id;
        req.auth=true
        next()
    }
    catch(e){
        req.auth=false
        next()
    }
};