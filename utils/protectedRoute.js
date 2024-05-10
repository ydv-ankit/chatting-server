const jwt = require("jsonwebtoken");

module.exports.protectedRoute = (req, res, next) => {
  const token = req.cookies?.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      throw new Error("Unauthorized");
    } else {
      req.user = user;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
