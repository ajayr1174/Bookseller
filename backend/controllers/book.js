
const Book = require("../models/book")



exports.getBookById = (req, res, next, id) => {
    Book.findById(id).exec((err, book) => {
      if (err) {
        return res.status(404).json({
          err: "book not found",
        });
      }
      req.book = book;
      next();
    });
  };



  exports.getBook = (req, res) => {
    res.json(req.book);
  };


exports.getAllbooks =(req, res) =>{
    let offset =0;
    if(req.query.offset)offset = req.query.offset;
  
    
    Book.find().skip(offset).limit(20).exec((err, books) =>{
        if(err){
            return res.status(404).json({
                err: "books not found"
            })
        }
       res.status(200).json(books)
    })
}