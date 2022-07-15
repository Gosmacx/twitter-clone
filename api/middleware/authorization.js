const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const decodedCode = jwt.verify(req.headers.authorization, '!8bc4.655')
        if (decodedCode) next();
    } catch (error) {
        return res.status(401).send("Yetkisiz erişim")
    }
}