const mongoose = require("mongoose");

module.exports.connectDB = async () => {
  try {
    const connString = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;
    const conn = await mongoose.connect(connString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
