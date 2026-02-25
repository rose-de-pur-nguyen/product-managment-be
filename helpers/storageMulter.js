const multer = require("multer");

// Không cần truyền tham số gì 
// vì Multer tự động lưu và truyền "file"
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    })

    return storage;
}