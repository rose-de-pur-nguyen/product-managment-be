const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const token = req.cookies.tokenUser;
        const user = await User.findOne({ tokenUser: token }).select("-password");
        if(!user) {
            res.redirect(`/user/login`);
        } else {
            res.locals.user = user;
            next();
        }
    } else {
        res.redirect(`/user/login`);
    }
}