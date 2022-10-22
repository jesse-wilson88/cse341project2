const validator = require("../helpers/validate");

const saveContact = (req, res, next) => {
  const validateRule = {
    firstName: "required|string",
    lastName: "required|string",
    streetAddress: "string",
    city: "string",
    state: "string",
    zipCode: "string",
    country: "string",
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
};
