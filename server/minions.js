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
const WORK = "work";

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
minionsRouter.get("/:minionId/work", (req, res, next) => {
  const work = getAllFromDatabase(WORK).filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);
});

/* POST /api/minions/:minionId/work to create a new work object and save it to the database. */
minionsRouter.post("/:minionId/work", (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;
  const createdWork = addToDatabase(WORK, workToAdd);
  res.status(201).send(createdWork);
});

minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById(WORK, id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

/* PUT /api/minions/:minionId/work/:workId to update a single work by id. */
minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase(WORK, req.body);
    res.send(updatedWork);
  }
});

/* DELETE /api/minions/:minionId/work/:workId to delete a single work by id. */
minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId(WORK, req.params.workId);
  if (deletedWork) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
