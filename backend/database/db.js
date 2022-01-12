const mongoose = require("mongoose");


const connectApp  = async (app) =>{
    try{
       await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true

        })
        console.log(`database is connected`)
        app.listen(process.env.PORT, ()=>{
            console.log(`server is running on port ${process.env.PORT}`);
        })

    }catch(err) {
        console.log(err)
     
    }
}

module.exports= connectApp;