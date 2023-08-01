const jwt = require('jsonwebtoken');
const JWT_SECRET = "harsh";

// We will call this middleware where we login is required
const fetchuser = (req, res, next) => {
    // Get the user from the JWT and add id to req object
    // We get the token from the header
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate a valid token" });
    }
}

module.exports = fetchuser;