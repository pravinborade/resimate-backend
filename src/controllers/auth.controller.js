const db = require("../config/db");
const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { name, mobile, role, password, email } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    if (!role) {
      res.status(400).json({
        success: false,
        message: "role is required",
      });
    }

    const user = await registerUser({ name, mobile, role, password, email });

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      res.status(400).json({
        success: false,
        message: "password is required",
      });
    }
    const user = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "login successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
