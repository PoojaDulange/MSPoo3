const pool = require("../../config/db.js");
module.exports = {
  create: (data, callback) => {
    const sql = `call insertUsersData(?,?,?,?,?,?)`;
    pool.query(
      sql,
      [
        data.email,
        data.churchID,
        data.organizationID,
        data.people,
        data.password,
        data.userType,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        console.log(results);
        return callback(null, results);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    const sql = `call getUsersOne(?)`;
    pool.query(sql, [email], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      console.log(results[0]);
      return callback(null, results[0]);
    });
  },
};
