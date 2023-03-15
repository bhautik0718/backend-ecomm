'use strict';

let express = require("express"),
helpers = require("../helpers/uploadfile"),
    router = express.Router(),
    controller = require("../controllers/order");


router.post("/order_add" ,helpers.upload.single('cart_image'),controller.addProduct);
// router.get("/getAll",controller.getAllproduct)
router.get("/order_get/:userId",controller.getProduct)
router.delete("/order_delete/:id",  controller.deleteProduct);
// router.put("/updateProduct/:id" ,helpers.upload.single('employee_image'),controller.updateProduct);
// router.post("/getAllProduct",controller.getAllSearchProduct)

module.exports = router;