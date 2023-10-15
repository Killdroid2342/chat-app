const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(token) {
  try {
    const res = jwt.verify(token, process.env.TokenA);
    return res;
  } catch (err) {
    return false;
  }
}

const jwtToken = (username) => {
  const jwtSignin = jwt.sign(
    {
      username,
    },
    process.env.TokenA,
    { expiresIn: '7d' }
  );
  return jwtSignin;
};

module.exports = {
  verifyToken,
  jwtToken,
};
