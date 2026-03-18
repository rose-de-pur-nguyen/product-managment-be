module.exports.createPost = (redirectPath) => {
    return (req, res, next) => {
        if(!req.body.title) {
            req.flash("error", "Vui lòng nhập tiêu đề");
            res.redirect(redirectPath);
            return
        }

        next()
    }
}


    