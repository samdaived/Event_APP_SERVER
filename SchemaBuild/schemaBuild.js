import {buildSchema} from 'graphql';


const SchemaBuild= buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        date: String!
        price: Float!
        creator: [User!]
        participant: [User!]
    },

    type AuthData {
        token: String!
        userId: String!
        expiredIn: Int

    }

    type User {
        _id: ID!
        email:String
        password:String
        createdEvent:[Event!]
        participantIn:[Event!]
    }


    input eventInput {
        title: String!
        description: String!
        date: String
        price: Float!
    
    }

    type queryRoot {
        event(first: Int, after: String): [Event!]!
        user:[User!]!
    }
    type mutationRoot {
        createEvent(inputEvent: eventInput): Event
        createUser(email:String, password:String): AuthData
        login(email:String,password:String): AuthData
        bookEvent(eventId:ID!): Event
        deleteEvent(eventId:ID!): Event
        cancelBook(eventId:ID!):Event
    }
    schema {
        query:queryRoot
        mutation:mutationRoot
    }
    `);

    module.exports=SchemaBuild;