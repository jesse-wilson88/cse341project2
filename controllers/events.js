const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // console.log(`User is ${req.user}`);
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  // console.log(req.user);
  const result = await mongodb
    .getDb()
    .db()
    .collection("events")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const eventId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("events")
    .find({ _id: eventId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createEvent = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const contact = {
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("events")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact."
      );
  }
};

const updateEvent = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const eventId = new ObjectId(req.params.id);
  const contact = {
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("events")
    .replaceOne({ _id: eventId }, contact);
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

const deleteEvent = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const eventId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("events")
    .deleteOne({ _id: eventId }, true);
  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent,
};
