const appConfig = require("../config/app");

const AuthorizationController = {
  login: (req, res) => {
    const authorizationUrl = `${
      appConfig.authorizationHost
    }/authorize?response_type=code&client_id=${
      appConfig.clientID
    }&redirect_uri=${encodeURIComponent(
      appConfig.redirectUrl
    )}&state=1234&scope=openid%20profile%20email`;

    res.redirect(authorizationUrl);
    // res.redirect(
    //   "https://dev-3y7ljkeqs73u3lsn.us.auth0.com/authorize?response_type=code&client_id=UFB7NTyEMySxua6w8MNpdRHLrSxf9kvY&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=1234&scope=openid%20profile%20email"
    // );
  },
  callback: async (req, res) => {
    // res.json(req.query.code); // Returns the code without the lines of code below
    const response = await fetch(`${appConfig.authorizationHost}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: appConfig.clientID,
        client_secret: appConfig.clientSecret,
        redirect_uri: appConfig.redirectUrl,
        scope: "openid profile email",
        code: req.query.code,
      }),
    });

    const jsonResponse = await response.json();

    res.json(jsonResponse);
  },
};

module.exports = AuthorizationController;
