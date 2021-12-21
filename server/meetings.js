const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

const MEETINGS = "meetings";

meetingsRouter.param("meetingsId", (req, res, next, id) => {
  const meeting = getFromDatabaseById(MEETINGS, id);
  if (meeting) {
    req.meeting = meeting;
    next();
  } else {
    res.status(404).send();
  }
});

/* GET /api/meetings to get an array of all meetings. */

/* POST /api/meetings to create a new meeting and save it to the database. */

/* DELETE /api/meetings to delete all meetings from the database. */
