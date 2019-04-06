import User from '../models/users';
import Event from '../models/events';
import {user} from '../mergers/mergers';



// showing the available events
const event=async ()=>{
         
    try{
        const allEvent=await Event.find()
        return allEvent.map(re=>{
                return {...re._doc,_id:re.id,
                //populate the data 
                participant:user.bind(this,re._doc.participant),
                creator:user.bind(this,re._doc.creator)}})
    }catch(e){
        throw e
    }
};

const createEvent=async (arg,req)=>{
     if(!req.auth){
         throw new Error("you are not authenticated")
     }
    const eventNew =new Event({...arg.inputEvent,
                                creator:req.userId                                        
                            });

    const savedEvent=await eventNew.save();

    const userFound=await User.findById(req.userId);
    // adding thr event to user created events
    userFound.createdEvent.push(savedEvent._id);

    await userFound.save();
    return {...savedEvent._doc,_id:savedEvent.id}

};


const bookEvent=async (args,req)=>{
    if(!req.auth){
        throw new Error("Sorry you are not authenticated")
    }
   const foundEvent=await Event.findById(args.eventId);
   if(!foundEvent){
       throw new Error("Sorry we can't find the event")
   };
   // checking if the user already is booked this event
   const alreadyPraticipant= foundEvent.participant.indexOf(req.userId)>=0;
   if(alreadyPraticipant){
       return foundEvent
   }
    
   foundEvent.participant.push(req.userId);
   foundEvent.save();
   const userFound=await User.findById(req.userId);

   // Adding the event to the user participated in 
   userFound.participantIn.push(foundEvent.id);
   await userFound.save()
   return foundEvent
};

const cancelBook=async(arg,req)=>{

    if(!req.auth){
        throw new Error("You are not authenticated")
    };
    const foundEvent=await Event.findById(arg.eventId);
    
    if(!foundEvent){
        throw new Error("Sorry we can\'t find the Event")
    };

    foundEvent.participant.splice(req.userId,1);

    const userFound=await User.findById(req.userId);

    userFound.participantIn.splice(foundEvent._doc.id,1);
    await userFound.save();
    await foundEvent.save();

    return foundEvent
};

const deleteEvent=async (arg,req)=>{
    if(!req.auth){
        throw new Error("You are not authenticated")
    };

    const foundEvent=await Event.findById(arg.eventId);

    if(!foundEvent){
        throw new Error("Sorry we can\'t find the Event")
    };

    if(foundEvent.creator.toString()!==req.userId){
        throw new Error("Sorry you cant remove this event")
    };
    // collecting the participants id in the event
    const participants= foundEvent.participant;
    const creatorId= foundEvent.creator;
    
    // finding the participants in the event 
    const userParticipants=await User.find({_id:{$in:participants}})

    await userParticipants.map(async (user)=>{
            // remove the event is from the users 
            user.participantIn.splice(foundEvent._doc._id, 1);
            await user.save();
            return null
        });
    const creator=await User.findById(creatorId);
    // remove the Event from creator
    creator.createdEvent.splice(foundEvent._doc._id, 1);
    await creator.save();
    // remove the Event
    return foundEvent.remove().then(re=>{return {...re._doc,_id:re.id}})
};

module.exports={event,createEvent,cancelBook,bookEvent,deleteEvent}