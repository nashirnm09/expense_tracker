const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.db_url).catch((error) => {
    console.log(error);
  });
};

module.exports = connectDb;
