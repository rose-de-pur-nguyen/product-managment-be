module.exports.registerPost = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên!");
        res.redirect("/user/register");
        return;
        // Still need return cause res.redirect doesnt automatically stop your function
        // it sends the redirect response, but the JS code will still keep running unless
        // we stop it ourself
    }

    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("/user/register");
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        res.redirect("/user/register");
        return;
    }

    next();
}

module.exports.loginPost = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("/user/login");
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        res.redirect("/user/login");
        return;
    }

    next();
}

module.exports.forgotPasswordPost = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("/user/password/forgot");
        return;
    }

    next();
}

module.exports.otp = (req, res, next) => {
    if(!req.body.otp) {
        req.flash("error", "Vui lòng nhập mã OTP!");
        res.redirect(`/user/password/otp?email=${req.body.email}`);
        return;
    }

    next();
}

module.exports.resetPassword = (req, res, next) => {
    if(!req.body.newPassword) {
        req.flash("error", "Vui lòng nhập mật khẩu mới!");
        res.redirect("/user/password/reset");
        return;
    }

    if(!req.body.confirmPassword) {
        req.flash("error", "Vui lòng xác nhận mật khẩu!");
        res.redirect("/user/password/reset");
        return;
    }

    next();
}