const { postsModel } = require("../models/posts.model");

const postGet = async (req, res) => {
  let query = {};
  let pagination = 0;
  let perPage = 0;
  const { min, max, page, device, device1, device2 } = req.query;
  if (min) {
    query.no_of_comments = { $gt: min };
  }
  if (max) {
    query.no_of_comments.$lt = max;
  }
  if (page) {
    perPage = 3;
    pagination = (page - 1) * perPage;
  }
  if (device) {
    query.device = device;
  }
  if (device1 && device2) {
    query.$or = [{ device: device1 }, { device: device2 }];
  }
  try {
    const status = await postsModel.find(query).skip(pagination).limit(perPage);
    res.status(200).send({ data: status });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};

const postAdd = async (req, res) => {
  try {
    const status = new postsModel(req.body);
    const response = await status.save();
    res.status(200).send({ msg: "Post Uploaded", data: response });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};

const postEdit = async (req, res) => {
  const postId = req.params.postId;
  console.log(req.body);
  try {
    const status = await postsModel.findByIdAndUpdate(
      { _id: postId, userId: req.body.userId },
      { $set: req.body }
    );
    res.status(200).send({ msg: "Post Updated", data: status });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};
const postDelete = async (req, res) => {
  const postId = req.params.postId;

  try {
    const status = await postsModel.findByIdAndDelete({
      _id: postId,
      userId: req.body.userId,
    });
    res.status(200).send({ msg: "Post Deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};

const postGetTop = async (req, res) => {
  let pagination = 0;
  let perPage = 0;
  const { page } = req.query;

  if (page) {
    perPage = 3;
    pagination = (page - 1) * perPage;
  }
  try {
    const status = await postsModel
      .find()
      .sort({ no_of_comments: -1 })
      .skip(pagination)
      .limit(perPage);
    res.status(200).send({ data: status });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};
module.exports = {
  postGet,
  postAdd,
  postDelete,
  postEdit,
  postGetTop,
};
