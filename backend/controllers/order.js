const Order = require("../models/order")
const User = require("../models/user")



exports.getAllOrders = (req, res) => {
  
    Order.find({user:req.profile.id})
      .populate("user", "_id name").populate("products")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No orders found in DB"
          });
        }
        res.json(order);
      });
  };



exports.placeOrder = (req, res)=>{
    req.body.order.user = req.profile._id;

     const order = new Order(req.body.order);
     order.save((err, order) =>{
         if(err){
             return res.status(400).json({
                 er: err,
                 err: "order not placed"
             })
         }

         res.json(order);
     })
     
  }






  exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    console.log(req.body)
    req.body.order.products.forEach(product => {
      purchases.push({
        id: product._id,
        name: product.title,
        description: product.description,
        quantity: product.quantity,
        amount: req.body.order.amount,
        
      });
    });
  
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save purchase list"
          });
        }
        next();
      }
    );
  };
  