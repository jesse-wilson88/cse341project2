const router = require("exprerss").Router();

router.use("/contacts", require("./contacts"));
router.use("/api-docs", require("./docs"));

module.exports = router;
