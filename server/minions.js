const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const MINIONS = "minions";

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById(MINIONS, id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

/* GET /api/minions to get an array of all minions. */
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase(MINIONS));
});

/* POST /api/minions to create a new minion and save it to the database. */
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase(MINIONS, req.body);
  res.status(201).send(newMinion);
});

/* GET /api/minions/:minionId to get a single minion by id. */
minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

/* PUT /api/minions/:minionId to update a single minion by id. */
minionsRouter.put("/:minionId", (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase(MINIONS, req.body);
  res.send(updatedMinionInstance);
});

/* DELETE /api/minions/:minionId to delete a single minion by id. */
minionsRouter.delete("/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId(MINIONS, req.params.minionId);
  if (deletedMinion) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

/* GET /api/minions/:minionId/work to get an array of all work for the specified minon. */
/* POST /api/minions/:minionId/work to create a new work object and save it to the database. */
/* PUT /api/minions/:minionId/work/:workId to update a single work by id. */
/* DELETE /api/minions/:minionId/work/:workId to delete a single work by id. */