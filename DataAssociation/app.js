const express = require('express');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/posts");

app.get("/" , (req , res)=>{
    res.send("Hey");
});

app.get("/create" , async(req , res)=>{
    let user = await userModel.create({
        username : "Ritik Chaurasia" ,
        email : "rk@gmail.com" ,
        age : 21 ,
    })
    res.send(user)
});


app.get("/post/create" , async(req , res)=>{
    let post = await postModel.create({
        postdata : "Hello " ,
        user : "66f437a4a5533983ae60258f" , 
    })
    let user = await userModel.findOne({_id : "66f437a4a5533983ae60258f"});
    user.posts.push(post._id);
    await user.save()
    res.send({post , user});
});

app.listen(3000 , ()=>{
    console.log("This  is running on port 3000 ");
});
