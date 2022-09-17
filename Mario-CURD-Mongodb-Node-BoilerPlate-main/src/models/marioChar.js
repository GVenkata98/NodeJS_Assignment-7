const mongoose = require('mongoose');

//  Your code goes here
const marioModelschema = new mongoose.Schema({
    name:{type :String , required:true},
    weight:{type: Number , required:true}
},{timestamps:true})

const marioModel = mongoose.model('marios' , marioModelschema)
module.exports = marioModel;