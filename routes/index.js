const router = require("express").Router();

const openCors = require("../middleware/openCors");
const authorizationRoutes = require("./authorization");
const contacts = require("./contacts");

router.use(openCors);

router.use("/contacts", require("./contacts"));
router.use("/api-docs", require("./docs"));
router.use("/authorization", authorizationRoutes);
router.use("/api/v1/contacts", contacts);

module.exports = router;
