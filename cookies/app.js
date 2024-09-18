// ========== set cookies and read the cookies ======

// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();

// app.use(cookieParser())

// // Here has set the cookie in just below code 

// app.get("/" , function(req , res){
//     res.cookie("name" , " Ritik ");
//     res.send("Done");
// });

// // Here has read the cookie in just below code . To read the cookie we have to need require cookie-parser

// app.get("/read" , function(req , res){
//     console.log(req.cookies);
//     res.send("hellocookie");
// });

// app.listen(3000 , ()=>{
//     console.log(" This is running on port number 3000 ");
// });

// ================Just below  Code for Encrypt the password and decrypt the password =============================================

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

// ========================= Encrypt the password =========================
// app.get("/" , function(req , res){
//     bcrypt.genSalt(10 , function(err , salt ){
//         bcrypt.hash("password" , salt , function(err , hash){
//             console.log(hash);
//         });
//     });
// });

//=========== To decrypt the password , it returns boolean ================

app.get("/" , function(req , res){
    // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    //     // result == true
    // });

    bcrypt.compare("password", "$2b$10$M/KYGvsUXjarmI0NMP1PBuH0eXM.C7pBW2cwNcNWDEX6l22zw5M/O", function(err, result) {
        console.log(result);
    });
});



app.listen(3000 , ()=>{
    console.log(" This is running on port number 3000 ");
});