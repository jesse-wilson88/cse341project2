const router = require("express").Router();

const openCors = require("../middleware/openCors");
const authorizationRoutes = require("./authorization");
const contacts = require("./contacts");
const loadUser = require("../middleware/loadUser");
const events = require("./events");

router.use(openCors);

router.use("/contacts", loadUser, require("./contacts"));
router.use("/events", loadUser, require("./events"));
router.use("/api-docs", require("./docs"));
router.use("/authorization", authorizationRoutes);
router.use("/api/v1/contacts", loadUser, contacts);
router.use("/api/v1/events", loadUser, events);

module.exports = router;
