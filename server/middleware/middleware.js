const User = require("../models/User");
const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkeyofnoteapp1234@&");
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    req.user = { name: user.name, id: user._id };
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = middleware;
