const { userModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userGet = async (req, res) => {
  try {
    const status = await userModel.find();
    res.send(JSON.stringify(status));
  } catch (error) {
    res.send("erro");
  }
};

const userRegister = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
      if (hash) {
        req.body.password = hash;
        const status = new userModel(req.body);
        const response = await status.save();
        res.status(200).send({ msg: "Registration Successfull" });
      } else {
        res.status(500).send({ msg: "Internal server Error" });
      }
    });
  } catch (error) {
    console.log(req.body);
    res.status(500).send({ msg: "Internal server Error" });
  }
};
const userLogin = async (req, res) => {
  try {
    const isValid = await userModel.exists({ email: req.body.email });
    if (isValid) {
      const status = await userModel.findOne({ email: req.body.email });
      bcrypt.compare(req.body.password, status.password, (err, stat) => {
        if (stat) {
          res.status(200).send({
            msg: jwt.sign({ _id: status._id, name: status.name }, "devn"),
          });
        } else {
          res.status(404).send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.status(200).send({ msg: "User already exist, please login" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};
module.exports = {
  userGet,
  userLogin,
  userRegister,
};
