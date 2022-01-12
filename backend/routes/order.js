const express = require("express");
const router = express.Router();

const {getUserById} = require("../controllers/user")
const {getAllOrders,placeOrder, pushOrderInPurchaseList } = require("../controllers/order")
const {getBookById} = require("../controllers/book")
const {isSignedIn, isAuthenticated}= require("../controllers/auth")


router.param("userid", getUserById);
router.param("bookid", getBookById);



router.get("/orders/:userid", getAllOrders);
router.post("/order/place/:userid",isSignedIn,isAuthenticated,pushOrderInPurchaseList, placeOrder);




module.exports = router;