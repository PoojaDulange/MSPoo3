const { getUserByEmail, create } = require("./users.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "DatabaseConnection Failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    console.log("&&&", body);
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "connection not established",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Email not found",
        });
      }
      const result = compareSync(body.password, results[0].password);
      console.log(result);
      if (result) {
        results.password = undefined;
        const jsonToken = sign({ result: results }, "test123", {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: 1,
          message: "login Successful",
          token: jsonToken,
        });
      } else {
        res.status(500).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
};
