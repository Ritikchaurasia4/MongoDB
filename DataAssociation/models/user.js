const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/testingTheDatabase`);

const userSchema = mongoose.Schema({
    username : String ,   // we can also write this   username : { type : String }
    email : String ,
    age : Number ,
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'posts' ,
        }
    ] ,
});
module.exports = mongoose.model("user" , userSchema);