module.exports.createPost = (redirectPath) => {
    return (req, res, next) => {
        if(!req.body.title) {
            req.flash("error", "Vui lòng nhập tiêu đề");
            
            const path = typeof redirectPath === "function"
                ? redirectPath(req)
                : redirectPath

            res.redirect(path);
            return
        }

        next()
    }
}


    