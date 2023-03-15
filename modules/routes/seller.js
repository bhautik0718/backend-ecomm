'use strict';

let express = require("express"),
helpers = require("../helpers/uploadfile"),
    router = express.Router(),
    controller = require("../controllers/seller");
router.post("/signUp" ,controller.signIn);
router.post("/login",controller.addLogin)

module.exports = router;