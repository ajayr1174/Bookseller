const express = require("express");
const router = express.Router();

const {getAllbooks,getBookById, getBook} = require("../controllers/book")

router.param("bookid", getBookById);



router.get("/books" ,getAllbooks);
router.get("/book/:bookid", getBook),




module.exports = router