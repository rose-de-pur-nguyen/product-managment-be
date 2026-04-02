const ProductCategory = require("../../models/productCategory.module");

const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
    let find = {
        status: "active",
        deleted: false,
    }

    const productCategory = await ProductCategory.find(find);

    const newProductCatgory = createTreeHelper(productCategory);

    res.locals.layoutProductsCategory = newProductCatgory;

    next();
    
}