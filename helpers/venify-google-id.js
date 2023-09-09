const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

async function verifyGoogleId(idToken = "") {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, picture, email } = ticket.getPayload();

  return { name, picture, email };
}

module.exports = {
  verifyGoogleId,
};
