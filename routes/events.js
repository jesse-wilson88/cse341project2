const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events");
const validation = require("../middleware/validateEvent");
const loadUser = require("../middleware/loadUser");

router.use([loadUser]);

router.get("/", eventsController.getAll);

router.get("/:id", eventsController.getSingle);

router.post("/", validation.saveEvent, eventsController.createEvent);

router.put("/:id", validation.saveEvent, eventsController.updateEvent);

router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
