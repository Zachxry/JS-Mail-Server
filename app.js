// Mailchimp module
const mailchimp = require('@mailchimp/mailchimp_marketing')

// Mail Server 
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000

//Api Key 
import {mail_api_key} from './api_key.js';
import {mail_listId} from './api_key.js';

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


mailchimp.setConfig({
    apiKey: mail_api_key,
    server: "us5"
});


app.post('/', function(req,res){
    // data submitted by user
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    const listId = mail_listId;

    // Creating object with users data
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    //Upload data to the Server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId,{
            email_address: subscribingUser.email,
            status:"subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        // after logging contacts listId, redirect to success page
        res.sendFile(__dirname + "/success.html")
        console.log(`Added contact as an audience member. The contact's id is ${response.id}.`);
    }

    // running function and catching errors
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
    
});

// failure redirection to home page
app.post('/failure', function(req,res){
    res.redirect("/");
});

