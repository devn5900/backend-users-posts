const { Router } = require("express");
const {
  userGet,
  userRegister,
  userLogin,
} = require("../controllers/users.controller");
const { userData, userLog } = require("../middlewares/users.middleware");

const userRouter = Router();

userRouter.get("/usrData", userGet);
// {
//   "name":"devn",
// "email":"devn5900@gmail.com",
// "gender":"Male",
// "password":"devn",
// "age":23,
// "city":"blp",
// "is_married":false
// }
userRouter.post("/register", userData, userRegister);
userRouter.post("/login", userLog, userLogin);

module.exports = {
  userRouter,
};
