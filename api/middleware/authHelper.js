const jwt = require('jsonwebtoken');

// Middleware to verify JWT and extract user ID
const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ status: 'ERR', message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req._id = decoded._id; // Attach user ID to the request object
    next();
  } catch (error) {
    return res.status(401).send({ status: 'ERR', message: 'Unauthorized access' });
  }
};

module.exports = authenticateToken;
