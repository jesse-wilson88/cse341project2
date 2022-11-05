const router = require("express").Router();

const openCors = require("../middleware/openCors");
const authorizationRoutes = require("./authorization");
const contacts = require("./contacts");
const loadUser = require("../middleware/loadUser");

router.use(openCors);

router.use("/contacts", loadUser, require("./contacts"));
router.use("/api-docs", require("./docs"));
router.use("/authorization", authorizationRoutes);
router.use("/api/v1/contacts", loadUser, contacts);

module.exports = router;
