const loadUser = (req, res, next) => {
  console.log("Loading contact...");
  next();
};

module.exports = loadUser;
