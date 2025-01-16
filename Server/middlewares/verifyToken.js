const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {

        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    mes: 'Token được cung cấp không hợp lệ'
                })
            }

            console.log(decode);
            req.user = decode
            next();
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Token không được cung cấp'
        })
    }
})


const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user

    if (role !== 'admin') {
        return res.status(401).json({
            success: false,
            mes: 'Bạn không có quyền thực hiện tác vụ này'
        })
    }

    next();
})

module.exports = {
    verifyAccessToken,
    isAdmin
}