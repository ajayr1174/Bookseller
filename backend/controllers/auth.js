const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt= require("bcryptjs")




const hashPassword = (plainPassword)=>{
    return  bcrypt.hashSync(plainPassword, 10);
}


const compare =(password, hash) =>{
    return bcrypt.compare(password,hash )
}



// signup controller

exports.signup = (req, res) => {
  console.log(req.body)
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    
    const {name, password, email} = req.body
    const hashedPassword = hashPassword(password);


    const user = new User({name, password: hashedPassword, email})
  
    user.save((err, user) => {
      if (err) {
        res.status(400).json({
          err: "User not save in database",
        });
      }
  
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    });
  };


//   signin controller
exports.signin = (req, res) => {
    const { email, password } = req.body;
  
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
  
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(400).json({
          error: "user email doesn't exist !",
        });
      }
  
      if (!compare(password,user.password)) {
        return res.status(401).json({
          error: "email and password doesn't match",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
  

      const { _id, name, email, role } = user;
  
      res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    });
  };


//   signout

exports.signout =(req, res) =>{
    res.send("signout")
}


//   Jwt verify

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    requestProperty: 'auth',
    algorithms: ["HS256"]
  });
  


  // is Authenticated

  exports.isAuthenticated = (req, res, next) => {
    
    let checker = req.profile && req.auth && req.profile.id === req.auth.id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
  };