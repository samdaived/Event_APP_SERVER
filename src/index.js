import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import schemaBuild from '../SchemaBuild/schemaBuild';
import Auth_check from '../middleware/auth';
import mongoose from 'mongoose';
import resolvers from '../resolvers/index';
import cors from 'cors'

const app=express();
const port=process.env.PORT;

app.use(cors());
// parsing
app.use(bodyParser.json());
// chack is the user is authenticated 
app.use(Auth_check);
// setting up grapgQl 
app.use("/graphql",graphqlHTTP({
    schema:schemaBuild,
    rootValue:resolvers,
    graphiql:true
}));

// connecting with the data base MONGODB 
mongoose.connect(`${process.env.DATA_BASE}`)
.then(()=>{
    app.listen(port,()=>{
        return console.log(`It worked ${port}`);
    })
})
.catch(er=>{console.log("connection",er);
});