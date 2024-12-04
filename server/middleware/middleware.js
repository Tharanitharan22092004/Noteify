const User = require("../models/User");
const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "secretkeyofnoteapp1234@&");
    if (!decoded) {
      return res.status(401).json({ message: "wrong token" });
    }
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    res.status(500).json({ message: "Please Login" });
  }
};

module.exports =middleware;
