const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
const md5 = require("md5");

// [GET] /user/register 
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}

// [POST] /user/register 
module.exports.registerPost = async (req, res) => {
    const email = req.body.email;

    const emailExist = await User.findOne({ email: email });

    if(emailExist) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("/user/register");
        return;
    } 

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();
    
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

// [POST] /user/loginPost
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
    });

    if(!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("/user/login");
        return;
    }

    if(user.password !== md5(password)) {
        req.flash("error", "Mật khẩu không chính xác");
        res.redirect("/user/login");
        return;
    }

    res.cookie("tokenUser", user.tokenUser); 
    res.redirect("/");
}

// [GET] /user/logout 
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

// [GET] user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    })
}

// [POST] user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email
    });

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("/user/password/forgot");
        return
    }

    // Lưu thông tin vào DB
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // If email exists then send OTP via email
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `Mã OTP lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút`;
    sendMailHelper.sendMail(email, subject, html);

    // if user then send OTP via email

    res.redirect(`/user/password/otp?email=${email}`);
}

// [GET] user/password/otp
module.exports.otp = async (req, res) => {
    const email = req.query.email; 

    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email: email
    })
}

// [POST] user/password/otp
module.exports.otpPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const otpValid = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    });
 
    if(!otpValid) {
        req.flash("error", "Mã OTP không chính xác!");
        res.redirect(`/user/password/otp?email=${email}`);
        return;
    }

    const user = await User.findOne({
        email: email,
    });

    // tokenUser to make sure later the person who resets password
    // is the actual account holder
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

// [GET] user/password/reset
module.exports.reset = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    })
}

// [POST] user/password/reset
module.exports.resetPost = async (req, res) => {
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;

    if(tokenUser) {
        if (newPassword !== confirmPassword) {
                req.flash("error", "Mật khẩu không trùng nhau");
                res.redirect("/user/password/reset");
                return;
            }

        await User.updateOne({
            tokenUser: tokenUser
        }, {
            password: md5(newPassword)
        });

        req.flash("success", "Đổi mật khẩu thành công");
        res.redirect("/user/login");

    }
    else {
        res.redirect("/user/password/forgot");
    }
}

// [GET] user/info
module.exports.info = async (req, res) => {
    res.render("client/pages/user/info", {
        pageTitle: "Thông tin tài khoản",
    })
}









