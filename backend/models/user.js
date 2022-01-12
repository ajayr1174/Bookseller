const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
      },
     
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
    
      password: {
        type: String,
        required: true
      },
      address:{
        type: String
      },
      purchases: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );
  

  module.exports =  mongoose.model("User", userSchema);