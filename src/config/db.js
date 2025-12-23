const pgp = require("pg-promise")({
  capSQL: true, // professional SQL formatting
});

const { db } = require("./env");

const database = pgp(db);

database.connect()
  .then(obj => {
    console.log("PostgreSQL connected ✅");
    obj.done();
  })
  .catch(error => {
    console.error("DB connection failed ❌", error);
  });

module.exports = database;
