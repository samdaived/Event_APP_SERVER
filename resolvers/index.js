const {event,createEvent,deleteEvent,cancelBook,bookEvent} =require('./event');
const {login,createUser} =require('./user');

const resolvers={
        event
        ,createEvent
        ,cancelBook
        ,bookEvent
        ,login
        ,createUser
        ,deleteEvent
}

module.exports= resolvers