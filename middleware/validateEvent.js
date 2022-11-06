const validator = require("../helpers/validate");

const saveEvent = (req, res, next) => {
  const validateRule = {
    eventName: "required|string",
    eventDate: "required|date",
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
  saveEvent,
};
