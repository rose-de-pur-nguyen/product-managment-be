const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
    // this middleware can be used for every routes
    app.use(categoryMiddleware.category);

    app.use("/", homeRoutes);

    app.use("/products", productRoutes);
}