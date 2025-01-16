const jwt = require('jsonwebtoken');

const generateAccessToken = (uid, name, role) => {
    const currentTime = Math.floor(Date.now() / 1000);

    const expirationTime = currentTime + (5 * 60);
    const token = jwt.sign({
        _id: uid,
        name: name,
        role: role,
        exp: expirationTime
    }, process.env.SECRET_KEY);

    return token;
}

const generateRefreshToken = (uid) => {
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