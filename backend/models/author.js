const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const authorSchema = mongoose.Schema({

    name: String,
    discription: String,
    books:[{
        type: ObjectId,
        ref:"Book"
    }]
})



module.exports = mongoose.model("Author", authorSchema);