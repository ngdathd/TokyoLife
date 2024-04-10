const jwt = require('jsonwebtoken');

const generateAccessToken = (uid, role) => {
    const currentTime = Math.floor(Date.now() / 1000);

    const expirationTime = currentTime + (5 * 60);
    const token = jwt.sign({
        _id: uid,
        role: role,
        exp: expirationTime
    }, process.env.SECRET_KEY);

    return token;
}

const generateRefreshToken = (uid, role) => {
    return jwt.sign({
        _id: uid,
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '7d'
        }
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}