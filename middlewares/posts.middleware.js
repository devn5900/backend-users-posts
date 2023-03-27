const jwt = require("jsonwebtoken");

const postData = (req, res, next) => {
  const { title, body, device, no_of_comments } = req.body;

  if (!title || !body || !device || !no_of_comments) {
    res.status(206).send({ msg: "Invalid Data" });
    return;
  }
  next();
};

const isAuthorized = (req, res, next) => {
  let token = req?.headers?.authorization;
  if (!token) {
    res.status(403).send({ msg: "You are not Authorized for this action" });
    return;
  }
  token = token.split(" ")[1];
  jwt.verify(token, "devn", (err, code) => {
    if (code) {
      req.body.userId = code._id;

      next();
    } else {
      res.status(403).send({ msg: "You are not Authorized for this action" });
    }
  });
};

module.exports = {
  postData,
  isAuthorized,
};
