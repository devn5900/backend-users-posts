const { Router } = require("express");
const {
  postGet,
  postAdd,
  postEdit,
  postDelete,
  postGetTop,
} = require("../controllers/posts.comtroller");
const { postData, isAuthorized } = require("../middlewares/posts.middleware");
const postsRouter = Router();

postsRouter.get("/", isAuthorized, postGet);
postsRouter.get("/top", isAuthorized, postGetTop);
postsRouter.post("/add", postData, isAuthorized, postAdd);
postsRouter.patch("/edit/:postId", isAuthorized, postEdit);
postsRouter.delete("/delete/:postId", isAuthorized, postDelete);

module.exports = {
  postsRouter,
};
