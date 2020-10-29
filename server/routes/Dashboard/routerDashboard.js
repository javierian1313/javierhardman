const express = require("express");
const router = express.Router();
const controllerDashboard = require("../../controllers/Dashboard/controllerDashboard");

router.post("/checkSession", controllerDashboard.order1);

module.exports = router;
