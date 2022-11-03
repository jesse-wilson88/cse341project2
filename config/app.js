require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationHost: process.env.AUTHORIZATION_HOST,
  redirectUrl: process.env.REDIRECT_URL,
};
