const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const {
  createMeeting,
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
} = require("./db");

const MEETINGS = "meetings";

/* GET /api/meetings to get an array of all meetings. */
meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase(MEETINGS));
});

/* POST /api/meetings to create a new meeting and save it to the database. */
meetingsRouter.post("/", (req, res, next) => {
  let newMeeting = addToDatabase(MEETINGS, createMeeting());
  res.status(201).send(newMeeting);
});

/* DELETE /api/meetings to delete all meetings from the database. */
meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase(MEETINGS);
  res.status(204).send();
});
