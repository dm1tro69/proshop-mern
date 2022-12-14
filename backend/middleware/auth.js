import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token){
        throw new Error('Authentication Invalid')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT)
        req.user = {userId: payload.userId}
        next()
    }catch (e) {
        throw new Error('Authentication Invalid')
    }
}
