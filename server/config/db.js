
 const mongoose = require('mongoose');

 const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully")
    }catch(err){
        console.error("Error connecting to MongoDB : ", err);
    }
 }

 module.exports = connectToDB;