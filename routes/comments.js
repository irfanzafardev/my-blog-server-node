const express = require("express");
const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");
const router = express.Router();

// GET all comments
router.get("/comments", async (req, res) => {
  const comments = await Comments.find();
  const postIds = comments.map((comment) => comment.postId);

  const posts = await Posts.find({ postId: postIds });

  const results = comments.map((comment) => {
    return {
      body: comment.body,
      post: posts.find((item) => item.postId === comment.postId)
    };
  });

  res.json({
    comments: results,
  });
});

module.exports = router;