const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/productsCategory.controller");
const validate = require("../../validates/admin/productsCategory.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const configSystem = require("../../config/system");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost(`${configSystem.prefixAdmin}/products-category/create`),
    controller.createPost
)

module.exports = router;