const mongoose = require("mongoose");
require("dotenv").config()


const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    .then(() => {
      console.log(`Mongodb connected with server`);
    })
};

module.exports = connectDatabase;
