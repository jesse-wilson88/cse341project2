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
  const result = await mongodb.getDb().db().collection("address_book").find();
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
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("address_book")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("address_book")
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

const updateContact = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    country: req.body.country,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("address_book")
    .replaceOne({ _id: userId }, contact);
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

const deleteContact = async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.send("Authorization failed");
    return;
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("address_book")
    .deleteOne({ _id: userId }, true);
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
  createContact,
  updateContact,
  deleteContact,
};
