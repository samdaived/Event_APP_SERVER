import {event,createEvent,deleteEvent,cancelBook,bookEvent} from './event';
import {login,createUser} from './user';

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