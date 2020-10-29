const express = require("express");
const router = express.Router();
const controllerExample = require("../controllers/controllerExample");

router.get("/dbTest", controllerExample.order1);

module.exports = router;
