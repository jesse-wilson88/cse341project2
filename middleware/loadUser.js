const appConfig = require("../config/app");

const loadUser = async (req, res, next) => {
  const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

  console.log(authZeroUser);
  // console.log("Loading contact...");
  // console.log(req.headers.authorization);
  next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });

  return response.json();
};

// Continue from 1:33:50

module.exports = loadUser;
