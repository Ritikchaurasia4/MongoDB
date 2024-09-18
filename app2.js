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

// app.get('/delete/:id' , async(req , res)=>{
//     let users = await userModel.findOneAndDelete({_id:req.params.id});
//     // res.render("read" , {users});
//     res.redirect("read");
// });

// we can also handle the error.

app.get('/delete/:id', (req, res) => {
    userModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedUser => {
            // If no user is found with the given ID
            if (!deletedUser) {
                return res.status(404).send("User not found");
            }

            // Redirecting to the '/read' route after successful deletion
            res.redirect('/read');
        })
        .catch(error => {
            // Handling potential errors
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});

// ===== update -----------------------------------------

app.get("/edit/:userid" , async(req , res)=>{
    let user = await userModel.findOne({_id:req.params.userid});
    res.render("edit" , {users:user});
});

app.post("/update/:userid" , async(req , res)=>{
    let{name , email , image} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid},{image,name,email} , {new : true});
    res.redirect("/read");
});

// ===== Create --------------\-----------------------

// app.post("/create" , (req , res)=>{
//     userModel.create({
//         name:req.body.name,
//         email:req.body.email,
//         imgage:req.body.imgurl,
//     })
// });

// The just above commented code can also be written as using destructuring

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