const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    const handleJWTCreation = (error, token) => {
      if (error) {
        console.error(error);
        return reject(new Error("JWT generation error"));
      }
      resolve(token);
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      handleJWTCreation
    );
  });
};

module.exports = { generateJWT };
