const  {Schema, model} = require("mongoose");

const UserItems = new Schema({
    email: {type: String, required: true},
    collectionName: {type: String, required: true},
    items: [{ madeIn: { type: String, default: ''},
    condition: { type: String, default: '' },
    damage: { type: String, default: '' },
    comments: { type: String, default: '' },
    description: { type: String, default: '' },
    notes: { type: String, default: '' },
    forSale: { type: Boolean, default: false },
    foreign: { type: Boolean, default: false },
    inStock: { type: Boolean, default: false },
    created: { type: Date, default: Date.prototype.getFullYear },
    bought: { type: Date, default: Date.prototype.getFullYear},
    firstRegistration: { type: Date, default: Date.prototype.getFullYear },
    amount: { type: Number, default: 0},
    readyToSail: { type: Number, default: 0},
    cost: { type: Number, default: 0},
    addedFields: { type: [], default: []},
}],
   


    
   
 },)


 module.exports = model('UserItems', UserItems);