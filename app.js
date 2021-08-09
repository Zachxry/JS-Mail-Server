// Mail Server 
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 3000

const app = express();
app.listen(port, function(){
    console.log("Starting server on port:" + port);
});

// serves local static content
app.use(express.static("public")); 

// parse data
app.use(bodyParser.urlencoded({extended: true}));

// route to home signup page
app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName, lastName, email);
})