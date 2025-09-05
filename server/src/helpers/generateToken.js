const { promisify } = require("util");
const jwtSign = promisify(jwt.sign);

async function generateToken(user) {
  const token = await jwtSign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}
