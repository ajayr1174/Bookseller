const User = require("../models/user")


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: err,
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };
  


  exports.getUser =(req, res) =>{
      const {_id , name, email , purchases} = req.profile;
      res.json({_id, name, email, purchases})
  }





  exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        
        const {_id , name, email , purchases} = user
        res.json({_id , name, email , purchases});
      }
    );
  };