const JWT = require("jsonwebtoken");
// const { validate } = require("../models/user");
require("dotenv").config()

const secret = process.env.SECRET_KEY;

function createTokenForUser(user) {
  const payload = {
    _id: user.id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  verifyToken,
};
