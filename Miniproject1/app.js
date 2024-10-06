const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set("view engine" , "ejs");   // This is use for set the ejs file

const postModel = require("./models/post"); 
const userModel = require("./models/user"); // here has import the userModel from user

const cookieParser = require('cookie-parser');  // This is used for read the cookie only
app.use(cookieParser());

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

app.get("/" , (req , res)=>{
    res.render("index");
});

app.post("/register" , async(req , res)=>{
    let{name , username , email , password , age} = req.body;  // Destructuring
    let user = await userModel.findOne({email});  // Here  we are checking that account is pre login or not with the email .
    if(user) return res.status(500).send("yes user is already registered");

    // create the user

    bcrypt.genSalt(10 , (err , salt)=>{
        bcrypt.hash(password , salt , async(err , hash)=>{
            const user = await userModel.create({
                name ,
                username ,
                email ,
                password :  hash ,
                age ,
            });

            let token = jwt.sign({email: email, userid: user._id} , "secretPasswordHere");
            res.cookie("token" , token);
            res.send("Registered");
        })
    })
});

// show login page
app.get("/login" , (req , res)=>{
    res.render("login");
});

// here you can login using a valid email and password otherwise you can not login
app.post("/login" , async(req , res)=>{
    // here we can login with email and password only
    let{ email, password} = req.body; 
    let user = await userModel.findOne({email});  
    if(!user) return res.status(500).send("Something went wrong");

    // Here may be the user put the wrong password for login .
    bcrypt.compare(password , user.password , (err, result)=>{
        if(result) {
            let token = jwt.sign({email: email, userid: user._id} , "secretPasswordHere");
            res.cookie("token" , token);
            res.status(200).send("you can login");
            
        }
        else res.redirect("/login");
    })
   
});

// logout : logout means , the cookie which set we had , remove that cookie

app.get("/logout" ,(req , res)=>{
    res.cookie("token" , " ");
    // res.cookie("token", "", { expires: new Date(0) });

    res.redirect("/login");
})

app.get("/profile" , isLoggedIn , (req , res)=>{
    console.log(req.user);
    // res.render("login");
    res.render("profile");

});

// create a middlewere . when we will have to login then we will meet this below middlewere.
function isLoggedIn(req, res, next){
    // if(req.cookies.token === "")  res.send("You must be loggedin");
    if(req.cookies.token === "")  res.redirect("/login");

    else{
        let data = jwt.verify(req.cookies.token , "secretPasswordHere");
        req.user = data;
        next();
    }
    // console.log(req.cookies);
    
}

//================ or , ==============================

// app.get("/profile", isLoggedIn, (req, res) => {
//     console.log(req.user);
//     res.render("profile");
// });

// //Middleware
// function isLoggedIn(req, res, next) {
//     // if (!req.cookies.token) return res.send("You must be logged in");
//     if (!req.cookies.token) return res.redirect("/login");

    
//     try {
//         let data = jwt.verify(req.cookies.token, "secretPasswordHere");
//         req.user = data;
//         next();
//     } catch (err) {
//         return res.status(401).send("Invalid token");
//     }
// }

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


