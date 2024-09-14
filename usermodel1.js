const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({   // Here Schema is a method that conatin information of user as an object.
    name : String ,
    username : String ,
    email : String ,
});

// If we work on route then it is necessary to export the model. export is a property  not method.
module.exports = mongoose.model("user" , userSchema);  