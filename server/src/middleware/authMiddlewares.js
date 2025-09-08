const { verifyToken } = require('../services/tokenService');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Access token is required" });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).send({ error: "Invalid authorization header format" });
    }

    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
