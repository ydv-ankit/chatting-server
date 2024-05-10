const userModel = require("../models/user.model");
// login
module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email, password }).select("-password");
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // new user
  module.exports.signup = async (req, res) => {
    try {
      const { username, email, password, gender, role } = req.body;
      const avatar = `https://avatar.iran.liara.run/username?username=${username}`;

      const user = await userModel.create({
        username,
        email,
        password,
        role,
        gender,
        avatar,
      });

      delete user._doc.password;
      res.cookie("token", "hello-world").status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  