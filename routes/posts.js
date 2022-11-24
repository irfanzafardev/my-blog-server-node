const express = require('express');
const router = express.Router();

const Posts = require("../schemas/post");
// GET all posts
router.get('/posts', async (req, res) => {
  const posts = await Posts.find()
  const result = posts.map(post => {
    return {
      post
    };
  })
  res.json({
    result
  });
});

// GET post by Id
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const posts = await Posts.find({ postId: Number(postId) })
  const result = posts.map(post => {
    return {
      post
    };
  })
  res.json({
    result
  });
});

// POST new post
router.post("/posts", async (req, res) => {
  const { postId, title, name, password, content } = req.body;

  const posts = await Posts.find({ postId });
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "The post already exists." });
  }

  const createdPosts = await Posts.create({ postId, title, name, password, content, createdAt: new Date() });

  res.json({ posts: createdPosts });
});

// PUT post item
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { title } = req.body;

  const existingPost = await Posts.find({ postId: Number(postId) });
  if (existingPost.length) {
    await Posts.updateOne({ postId: Number(postId) }, { $set: { title } });
  }

  res.json({ result: "update success" });
})

// DELETE post item
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  const existingPost = await Posts.find({ postId });
  if (existingPost.length > 0) {
    await Posts.deleteOne({ postId });
  }

  res.json({ result: "delete success" });
});

const Comments = require("../schemas/comment");
// POST new comments
router.post("/posts/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  const { commentId, body } = req.body;

  await Comments.create({ commentId: commentId, postId: Number(postId), body: body });

  res.json({ result: "success" });
});

// PUT comment item
router.put("/posts/:postId/comment/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;
  const { body } = req.body;

  const existingPost = await Comments.find({ postId: Number(postId), commentId: Number(commentId) });
  if (existingPost.length) {
    await Comments.updateOne({ commentId: Number(commentId) }, { $set: { body } });
  }

  res.json({ result: "update success" });
})

// DELETE comment item
router.delete("/posts/:postId/comment/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  const existingComment = await Comments.find({ commentId: Number(commentId), postId: Number(postId) });
  if (existingComment.length) {
    await Comments.deleteOne({ commentId });
  }

  res.json({ result: "delete success" });
})

module.exports = router;