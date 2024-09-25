
const express = require('express');
const app = express();

const path = require('path');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userModel = require("./models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine" , "ejs");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname , "public")));

app.get("/" , (req , res)=>{
    res.render("index");
});

// postman================

// app.post("/create" , async(req , res)=>{
//     const{username , email , password , age} = req.body;

//     bcrypt.genSalt(10 , (err , salt)=>{
//         bcrypt.hash(password , salt , (err , hash)=>{
//             // console.log(hash);
//         })
//     })

//     let createdUser = await userModel.create({
//         username ,
//         email ,
//         password ,
//         age
//     })
//     res.send(createdUser);
// });

app.post("/create" , (req , res)=>{
    const{username , email , password , age} = req.body;

    bcrypt.genSalt(10 , (err , salt)=>{
        bcrypt.hash(password , salt , async(err , hash)=>{
            let createdUser = await userModel.create({
                username ,
                email ,
                password : hash,
                age
            })

            // Login ----------

            let token = jwt.sign({email:email} , "secureMessagehere");

            // Now as a cookie , we can send this token on the browser.

            res.cookie("token" , token);

            res.send(createdUser);
        })
    })
});

// check login--------------------
app.get("/login" , (req , res)=>{
    res.render("login");
})

// If the user enter the wrong email then the user will not login . User get only null
app.post("/login" , async(req , res)=>{
    let user = await userModel.findOne({email : req.body.email});
    // console.log(user);
    if(!user) return res.send("Somethin went wrong");

    // console.log(user.password); // Gives encrypted password
    // console.log(user.password , req.body.password); // show actual password 

    bcrypt.compare(req.body.password , user.password , (err , result)=>{
        // console.log(result);
        if(result) {
            let token = jwt.sign({email : user.email} , "secureMessagehere");
            res.cookie("token" , token);
            res.send("Yes you can login");
        }
        else res.send("You can not login");
    })
;})


// Set for logout---------------
app.get("/logout" , (req , res)=>{
    res.cookie("token" , " ");
    res.redirect("/");
})

app.listen(3000 , ()=>{
    console.log("This is running on the port 3000 ");
})