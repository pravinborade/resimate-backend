// const pgp = require("pg-promise")({
//   capSQL: true, // professional SQL formatting
// });

// const { db } = require("./env");

//  const database = pgp(db);

// database.connect()
//   .then(obj => {
//     console.log("PostgreSQL connected ✅");
//     obj.done();
//   })
//   .catch(error => {
//     console.error("DB connection failed ❌", error);
//   });

const { db } = require("./env");

const { Pool } = require("pg");

const pool = new Pool(db);
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL connected successfully");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL connection error:", err.message);
  });

module.exports = pool;
