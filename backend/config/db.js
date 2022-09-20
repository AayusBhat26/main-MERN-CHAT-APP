const mongoose = require('mongoose');

const connectDB = async()=>{
      try {
            const conn = await mongoose.connect(process.env.MONGO_URL, {
                  useNewUrlParser: true, 
                  useUnifiedTopology: true, 
                  // useFindAndModify: true, 
            });
            console.log("Mongodb connected", conn.connection.host);
      } catch (error) {
            console.log(`error: ${error}`);
            process.exit();
      }
}

module.exports = connectDB;