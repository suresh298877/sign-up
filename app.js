//jshint esversion:6

const bodyParser=require("body-parser");
const request=require("request");
const express=require("express");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");




const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    
    // const data={
    //     members:[
    //         {
    //             email_address:email,
    //             status:"subscribed",
    //             merge_fields:{
    //                 FNAME:firstName,
    //                 LNAME:lastName
    //             }
    //         }
    //     ]
    // };
    // const jsonData=JSON.stringify(data);
    try{
        mailchimp.setConfig({
            apiKey: "7ef26f517dbb628c0448ea26ab1ac22d-us21",
            server: "us21",
        });
        const run = async () => {
            const response = await mailchimp.lists.addListMember("c6bf379c7a", {
              email_address: email,
              status: "subscribed",
              merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
              }
            });
    
          };
          run();
          res.send("<h1>login successfull</h1>")
    }
    catch{
        res.send("<h1>Login failed try again</h1>")
    }
});

app.listen(process.env.PORT||8080,()=>{
    console.log("server is running on port 3000");
})

// API KEY
// 47b9ce849fdff8dc2bd3134c7edc38a2-us21

//list id
// c6bf379c7a