const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require('../../validates/admin/account.validate');

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/my_account.controller");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch("/edit", 
    (req, res, next) => {
        req.uploadFolder = "account-avatars";
        next()
    },
    upload.single("avatar"),
    uploadCloud.upload,
    validate.editMyAccount("/admin/my-account/edit"),
    controller.editAccount);

module.exports = router;