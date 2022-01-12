const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;



const orderSchema = mongoose.Schema({
    products : [{
            type: ObjectId,
            ref: "Book"
        }],
    amount: Number,
    user: {
        type: ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

module.exports = mongoose.model("Order", orderSchema);