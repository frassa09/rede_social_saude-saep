import jwt from 'jsonwebtoken'

export const verifyJwt = (req, res, next) => {

    const { authorization } = req.headers


    const token = authorization.split('')[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

        if(err){
            res.status(401).json({
                message: 'Token inválido',
                success: false
            })
        }

        req.userId = decoded.id
        req.userName = decoded.nome
        req.userEmail = decoded.email

        next()
    })
}