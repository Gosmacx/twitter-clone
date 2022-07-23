import jwt from "jsonwebtoken"

export default (req, res, next) => {
    try {
        const decodedCode = jwt.verify(req.headers.authorization, process.env.secretKey)
        if (decodedCode) next();
    } catch (error) {
        return res.status(401).send("Yetkisiz erişim")
    }
}