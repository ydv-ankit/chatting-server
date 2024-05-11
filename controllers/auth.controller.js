const userModel = require("../models/user.model");
const generateJwtToken = require("../utils/jwtToken");

const cookieOptions = {
  expires: parseInt(process.env.COOKIE_EXPIRY) * 60 * 60 * 1000,
  httpOnly: true,
};

// login
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username, password })
      .select("-password");

    if (user) {
      user.isActive = true;
      await user.save();
      const token = generateJwtToken({
        userId: user?._id,
        username: user?.username,
      });
      res.cookie("token", token, cookieOptions).status(200).json({ user });
    } else {
      res.status(404).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// new user
module.exports.signup = async (req, res) => {
  try {
    const { fullname, username, email, password, gender, role } = req.body;

    const userExists = await userModel.findOne({ username, email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    let avatar = `https://avatar.iran.liara.run/public/username=${username}`;

    const user = await userModel.create({
      fullname,
      username,
      email,
      password,
      role,
      gender,
      avatar,
    });

    delete user._doc.password;
    // generate jwt token
    const token = generateJwtToken({
      userId: user?._id,
      username: user?.username,
    });
    // set cookie with token and send response
    res.cookie("token", token, cookieOptions).status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout
module.exports.logout = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, { isActive: false });
    res.clearCookie("token").status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
