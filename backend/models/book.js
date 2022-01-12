const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;


const bookSchema = mongoose.Schema({
    title: String,
    description: String,
    authors: [],
    price: Number,
    rating: Number,
    imgurl: String
})



module.exports = mongoose.model("Book", bookSchema);