const db = require("../config/db");
const userQueries = require("../queries/user.queries");

const findUserByMobile = async (mobile) => {
  const { rows } = await db.query(userQueries.FIND_USER_BY_MOBILE, [mobile]);
  return rows[0] || null;
};

const findUserByEmail = async (email) => {
  const { rows } = await db.query(userQueries.FIND_USER_BY_EMAIL, [email]);
  return rows[0] || null;
};

const createUser = async (user) => {
  const { rows } = await db.query(userQueries.CREATE_USER, user);
  return rows[0];
};

const findUserForLogin = async (email) => {
  const { rows } = await db.query(userQueries.FIND_USER_FOR_LOGIN, [email]);
  return rows[0] || null;
};

module.exports = {
  findUserByMobile,
  findUserByEmail,
  createUser,
  findUserForLogin,
};
