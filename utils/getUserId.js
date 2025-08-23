const jwt = require('jsonwebtoken');

async function getUserIdFromToken(token, secret) {
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded.userId;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

module.exports = getUserIdFromToken;