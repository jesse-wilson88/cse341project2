const router = require("express").Router();

const openCors = require("../middleware/openCors");

router.use(openCors);

router.use("/contacts", require("./contacts"));
router.use("/api-docs", require("./docs"));

module.exports = router;
