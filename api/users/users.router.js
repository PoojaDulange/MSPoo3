const { login, create } = require("./users.controller");
const router = require("express").Router();

router.post("/", create);
console.log("###");
router.post("/login", login);

module.exports = router;
