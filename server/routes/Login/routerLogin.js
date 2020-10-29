const express = require("express");
const router = express.Router();
const controllerLogin = require("../../controllers/Login/controllerLogin");

// router.post("/getUser", controllerLogin.order1);
// router.post("/checkUser", controllerLogin.order1);
router.post("/logout", controllerLogin.order2);
router.post("/updateUser", controllerLogin.order3);
router.post("/checkSession", controllerLogin.order4);

module.exports = router;
