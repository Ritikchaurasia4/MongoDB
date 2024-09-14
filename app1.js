const express = require('express');
const app = express();

const userModel = require('./usermodel1');

app.get("/",(req , res)=>{
    res.send("Hello");
});

// app.get("/create",(req , res)=>{
//     userModel.create({            // This code is asynchronous .
//         name : "Ritik" ,
//         username : "Rahul" ,
//         email : "ritik@gmail.com"  ,
//     });
//     console.log(" Hey ");         // Here hey execute first. 
// });

// === In just above commented code if we want to execute/print asynchronous code then for this we have two way .===========

// ------------------ First way to execute asynchronous code -----------------------

// ===== create ..................

app.get("/create",async(req , res)=>{
    let createduser = await userModel.create({            // This code is asynchronous . now execute first .
        name : "Ritik" ,
        username : "Rahul" ,
        email : "ritik@gmail.com"  ,
    });
    res.send(createduser);
    console.log(" Hey ");   // Here hey execute after asynchronous code . 
});

// ===== read...................

app.get("/read",async(req , res)=>{

    let users = await userModel.find();

    // give blank array......
    // let users = await userModel.find({name : "rr"}); 

    // only one read......
    // let users = await userModel.find({name : "Rahul chaurasia"}); 

    res.send(users);
});

// ===== update .................

app.get("/update",async(req , res)=>{
    // let createduser = await userModel.findOneUpdate(findone , update , {new : true});
    let updatedUser = await userModel.findOneAndUpdate({username:"Rahul"} , {name:"Rahul chaurasia"} , {new : true});

    res.send(updatedUser);
});

// ====  delete ....................

app.get("/delete",async(req , res)=>{
    
   let users = await userModel.findOneAndDelete({name:"Ritik"});

    res.send(users);
});



app.listen(3000,()=>{
    console.log("The code is running on port 3000");
});