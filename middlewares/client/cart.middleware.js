const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    if(!req.cookies.cartId) {
        // Tạo giỏ hàng
        const cart = new Cart();
        await cart.save();

        const expiresCookie = 1000 * 60 * 60 * 24 * 365;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        });
        
    } else {
        // Lấy giỏ hàng
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });

        // without initializing 0 as initial value for total
        // on the first loop, total is not 0. It becomes the first element of cart.products
        // this will returns an object
        cart.totalQuantity = cart.products.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        res.locals.miniCart = cart;
    }

    next();
}