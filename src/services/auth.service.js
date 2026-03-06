const db = require("../config/db");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/CustomError");
const userRepo = require("../repositories/user.repository");
const roleRepo = require("../repositories/role.repository");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, mobile, role, password, email }) => {
  if (mobile) {
    const mobileUser = await userRepo.findUserByMobile(mobile);
    if (mobileUser) {
      throw new CustomError(409, "Mobile number already registered");
    }
  }

  if (email) {
    const emailUser = await userRepo.findUserByEmail(email);
    if (emailUser) {
      throw new CustomError(409, "Email already registered");
    }
  }
  let passwordHash = null;
  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  const roleData = await roleRepo.findRoleByName(role);
  if (!roleData) {
    throw new CustomError(400, "Invalid role. Please provide a valid role");
  }

  const user = await userRepo.createUser([
    name,
    mobile || null,
    email || null,
    passwordHash,
    roleData.role_id,
    "active",
  ]);
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await userRepo.findUserForLogin(email);
  if (!user) {
    throw new CustomError(401, "Invalid email or password");
  }
  const isvaildPassword = await bcrypt.compare(password, user.password_hash);
  if (!isvaildPassword) {
    throw new CustomError(401, "Invalid email or password");
  }



  const token = jwt.sign(
    {
      user_id: user.user_id,
      role: user.role_name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: {
      id: user.role_id,
      name: user.role_name,
    },
    token,
  };
};
module.exports = { registerUser, loginUser };
