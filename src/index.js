const express =require('express');
const bodyParser =require('body-parser');
const graphqlHTTP =require('express-graphql');
const schemaBuild =require('../SchemaBuild/schemaBuild');
const Auth_check =require('../middleware/auth');
const mongoose =require('mongoose');
const resolvers =require('../resolvers/index');
const cors =require("cors");

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

app.get("/",(req,res)=>{
    res.send("working")
})
// connecting with the data base MONGODB 
mongoose.connect(`${process.env.DATA_BASE}`)
.then(()=>{
    app.listen(port,()=>{
        return console.log(`It worked ${port}`);
    })
})
.catch(er=>{console.log("connection",er);
});