const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtSignPromise = promisify(jwt.sign);
const jwtVerifyPromise = promisify(jwt.verify);

const createToken = (payload) => {
  const token = jwtSignPromise(
    {
      userId: payload.id,
      email: payload.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: CONSTANTANTS.ACCESS_TOKEN_TIME,
    }
  );
  return token;
};


const verifyToken = (token) => {
  const decoded = jwtVerifyPromise(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = {
  createToken,
  verifyToken
};
