const userData = async (req, res, next) => {
  const { name, email, gender, password, age, city, is_married } = req.body;

  if (
    !name ||
    !email ||
    !gender ||
    !password ||
    !age ||
    !city ||
    is_married == undefined
  ) {
    res.status(206).send({ msg: "Invaild Data" });
    return;
  }
  next();
};

const userLog = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(206).send({ msg: "Invaild Data" });
  }
  next();
};

module.exports = {
  userData,
  userLog,
};
