import jwt from 'jsonwebtoken';


module.exports=async(user)=>{
    
    const token= await jwt.sign({
        _id:user.id,
        email:user._doc.email
    },`${process.env.SECRET_DONT_TELL}`, { expiresIn: '1h'});

    return {
        userId:user.id,
        token:token,
        expiredIn:60*60*1000
    }

}