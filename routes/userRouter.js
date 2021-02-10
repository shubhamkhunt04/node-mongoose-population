const express = require("express");
const bodyParser = require("body-parser");
const User = require("../model/User");
const Post = require("../model/Post");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter
  .get("/", async (req, res, next) => {
    try {
      const user = await User.find();
      res.send(user);
    } catch (error) {
      throw new Error("User not found");
    }
  })
  .post("/create", async (req, res) => {
    result = {};
    try {
      const user = await User.create(req.body);
      if (user) {
        (result.payload = user), (result.message = "ok");
        res.send(result);
      }
    } catch (error) {
      throw new Error("User not created");
    }
  });

userRouter
  .get("/:userId/posts", async (req, res) => {
    result = {};
    try {
      const user = await User.findById(req.params.userId).populate("posts");
      res.send(user.posts);
    } catch (error) {
      throw new Error("Post not Found");
    }
  })
  .post("/:userId/createpost", async (req, res) => {
    result = {};
    try {
      const post = await Post.create(req.body);
      const user = await User.findById(req.params.userId);
      user.posts.push(post.id);
      await user.save();
      res.send(post);
    } catch (error) {
      throw new Error("Post not create");
    }
  });

module.exports = userRouter;
