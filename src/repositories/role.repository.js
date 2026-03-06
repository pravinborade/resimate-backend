const db = require("../config/db");
const roleQueries = require("../queries/role.queries");
const findRoleByName = async (role) => {
  const { rows } = await db.query(roleQueries.FIND_ROLE_BY_NAME, [role]);
  return rows[0] || null;
};

module.exports = {
  findRoleByName,
};
