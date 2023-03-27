const express = require("express");
const { connection } = require("../connection/db.con");
const { userRouter } = require("../routes/users.routes");
const { postsRouter } = require("../routes/posts.routes");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.get("/", (req, res) => {
  res
    .status(200)
    .contentType("text/html")
    .send("<h1>Welcome to Users/Posts API</h1>");
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
  connection();
});
