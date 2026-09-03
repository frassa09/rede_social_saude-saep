import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_KEY
const expiresIn = process.env.JWT_EXPIRESIN

export const generateJwt = (payload) => {

    const token = jwt.sign(payload, secret, {expiresIn})

    return token
}