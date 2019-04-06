import User from '../models/users';
import token from '../helpers/token';
import {hash,compare} from 'bcryptjs';



const login=async (arg,req)=>{
        
    if(req.auth){
        throw new Error('you are already authenticated');
    };
    const userFound=await User.findOne({email:arg.email});                      
    if(!userFound){
        throw new Error("Chack your email")
    };
    const passCheck =await compare(arg.password,userFound.password);
    if(!passCheck){
        throw new Error("Check your  Password")
    };
    if(passCheck){
        return await token(userFound);
    }
    
};

const createUser=async (arg)=>{
    try{
        const hashed=await hash(arg.password,12);
        // Adding the hashed password
        const newUser =new User({...arg,password:hashed});
        const savedUser=await newUser.save();
        // return null in pasword field
        return await token(savedUser)
    }catch(e){
        throw e
    }

;}
module.exports={login,createUser}