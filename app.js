const express = require('express');
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

app.use(express.json());

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
app.use("/api", [postsRouter, commentsRouter]);

app.get('/', (req, res) => {
  res.send('Hello myself!');
});

app.listen(port, () => {
  console.log(port, `Server is open with port ${port}!`);
});