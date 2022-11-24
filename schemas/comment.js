const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true
  },
  postId: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Comments", commentsSchema);