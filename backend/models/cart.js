const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const bookCartSchema = mongoose.Schema({
    products: {
        type: ObjectId,
        ref:"Book"
    },
    price: Number,
    count:Number,
})


module.exports = mongoose.model("Cart", bookCartSchema);