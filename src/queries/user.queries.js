const CREATE_USER = `
INSERT INTO users
(name, mobile, email, password_hash, role_id, status)
VALUES($1,$2,$3,$4,$5,$6)
RETURNING 
    user_id,
    name,
    mobile,
    email,
    role_id,
    status,
    created_at,
    updated_at;
`;
const FIND_USER_BY_MOBILE = `SELECT user_id FROM users WHERE mobile =$1`;

const FIND_USER_BY_EMAIL = "SELECT user_id FROM users WHERE email =$1";

const FIND_USER_FOR_LOGIN = `SELECT 
    u.user_id, 
    u.name,
    u.email,
    u.password_hash,
    u.status,
    r.role_id,
    r.role_name
    FROM users u
    JOIN roles r ON r.role_id = u.role_id
    WHERE email =$1;
`;

module.exports = {
  CREATE_USER,
  FIND_USER_BY_MOBILE,
  FIND_USER_BY_EMAIL,
  FIND_USER_FOR_LOGIN
};
