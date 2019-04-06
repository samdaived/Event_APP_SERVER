import {Schema,model} from 'mongoose';


const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    participant:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
});

module.exports=model("Event",eventSchema);


