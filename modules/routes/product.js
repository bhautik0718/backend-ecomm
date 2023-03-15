'use strict';

let express = require("express"),
helpers = require("../helpers/uploadfile"),
    router = express.Router(),
    controller = require("../controllers/product");


router.post("/addProduct" ,helpers.upload.single('employee_image'),controller.addProduct);
router.get("/getAll",controller.getAllproduct)
router.get("/getProduct/:id",controller.getProduct)
router.delete("/delete/:id",  controller.deleteProduct);
router.put("/updateProduct/:id" ,helpers.upload.single('employee_image'),controller.updateProduct);
router.post("/getAllProduct",controller.getAllSearchProduct)

module.exports = router;