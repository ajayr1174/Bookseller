const express= require("express");
const router = express.Router();

const authRoutes = require("./auth")
const bookRoutes = require("./book")
const userRoutes = require("./user")
const orderRoutes = require("./order")


router.use( authRoutes)
router.use(bookRoutes)
router.use(userRoutes)
router.use(orderRoutes)




module.exports = router;