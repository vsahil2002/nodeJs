const express = require("express")
const User=require("./model/user")

const bodyParser = require("body-parser");
// require("./model/index")
        
const app = express();
app.use(bodyParser.json());

app.post("/",()=>{
    console.log("i am server")
})

app.get('/sahil',User)

app.listen(2000,()=>{console.log("lstening on port no ")})
// const jane =  User.create({ firstName: "Jane", lastName: "Doe" });
// console.log("Jane's auto-generated ID:", jane.id);