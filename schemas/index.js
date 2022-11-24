const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/my_blog")
    // .connect("mongodb+srv://cluster0.tmmsx79.mongodb.net")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB my_blog connection error:", err);
});

module.exports = connect;