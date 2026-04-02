const Product = require("../../models/product.model");
const ProductCategory = require("../../models/productCategory.module");

const createTreeHelper = require("../../helpers/createTree");


// [GET] /
module.exports.index = async (req, res) => {

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
    });
}