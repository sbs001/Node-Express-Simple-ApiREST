const { Router } = require("express");
const { getUsers, postUsers, putUsers } = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post("/", postUsers);

router.put("/", putUsers);

module.exports = router;
