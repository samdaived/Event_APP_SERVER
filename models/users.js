import {Schema,model} from 'mongoose';


const UserSchema = new Schema({
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String,
    },
    createdEvent:[
        {
            type:Schema.Types.ObjectId,
            ref:'Event',
        },
    ],
    participantIn:[
        {
            type:Schema.Types.ObjectId,
            ref:'Event',
        },
    ],
});

module.exports=model("User",UserSchema);