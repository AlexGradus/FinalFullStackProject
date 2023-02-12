const  {Schema, model} = require("mongoose");

const UserCollection = new Schema({
    email: {type: String, required: true},
    collections: [{collectionName: {type: String, required: true},
    collectionType: {type: String, required: true},
    collectionMarkDownValue:{type: String},
    collectionImage:{type: String},}] 
    
   
 },)


 module.exports = model('UserCollection', UserCollection);