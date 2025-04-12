const mongoose = require( 'mongoose');

const userSchema = new mongoose.Schema({
    email : { type: String ,require : true},
    password : { type: String ,require : true},
    name :{type: String , require: false }
})


module.exports = mongoose.model('Users',userSchema)