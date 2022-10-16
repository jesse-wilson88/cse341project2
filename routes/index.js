const router = require("express").Router();

router.use("/contacts", require("./contacts"));
// router.use("/api-docs", require("./docs"));

module.exports = router;
