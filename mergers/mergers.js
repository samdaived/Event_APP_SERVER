const User =require('../models/users');
const Event= require('../models/events');



const user = userIds=>{

    return User.find({_id:{$in:userIds}})
    .then(res=>{
        return res.map(user=>{
            return {...user._doc,_id:user.id,password:null ,participantIn:event.bind(this,user._doc.participantIn), createdEvent:event.bind(this,user._doc.createdEvent)}
        })
    })
    .catch(er=>{
        throw er
    })
};


const event = eventIds=>{

    return Event.find({_id:{$in:eventIds}})
    .then(res=>{
        return res.map(event=>{
            return {...event._doc,_id:event.id,creator:user.bind(this,[event._doc.creator]),participant:user.bind(this,event._doc.participant)}
        })
    })
    .catch(er=>{
        throw er
    })
};


module.exports={user,event}