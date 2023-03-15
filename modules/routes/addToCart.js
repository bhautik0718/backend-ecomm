'use strict';

let express = require("express"),
helpers = require("../helpers/uploadfile"),
    router = express.Router(),
    controller = require("../controllers/addToCart");


router.post("/cart" ,helpers.upload.single('cart_image'),controller.addProduct);
// router.get("/getAll",controller.getAllproduct)
router.get("/getCart/:userId",controller.getProduct)
router.delete("/deleteCart/:id",  controller.deleteProduct);
// router.put("/updateProduct/:id" ,helpers.upload.single('employee_image'),controller.updateProduct);
// router.post("/getAllProduct",controller.getAllSearchProduct)

module.exports = router;