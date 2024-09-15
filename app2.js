const express = require('express');
const app = express();
const path = require('path');

const userModel = require('./models/user');

app.set("view engine" , "ejs");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname , "public")));

app.get("/" , (req , res)=>{
    res.render("index");
});

// ==== Read -------------------------------------

// app.get("/read" , (req , res)=>{
//     res.render("read");
// });

app.get("/read" , async(req , res)=>{
    let allUsers = await userModel.find();
    res.render("read" , {users:allUsers});
});

// ===== Delete -----------------------------------------

app.get('/delete/:id' , async(req , res)=>{
    let users = await userModel.findOneAndDelete({_id:req.params.id});
    // res.render("read" , {users});
    res.redirect("read");
});


// ===== Create --------------\-----------------------

// app.post("/create" , (req , res)=>{
//     userModel.create({
//         name:req.body.name,
//         email:req.body.email,
//         imgage:req.body.imgurl,
//     })
// });

// The just above commented code can also be written as usin destructuring

app.post("/create" , async(req , res)=>{
    let {name , email ,imgurl} = req.body;
    let createdUser = await userModel.create({
        name:name,
        email:email,
        image:imgurl,
    });
    res.send(createdUser);
});


app.listen(5000 , ()=>{
    console.log("This is running on Port 5000");
});