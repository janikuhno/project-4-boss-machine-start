const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const IDEAS = "ideas";

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById(IDEAS, id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

/* GET /api/ideas to get an array of all ideas. */
ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase(IDEAS));
});

/* POST /api/ideas to create a new idea and save it to the database. */
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase(IDEAS, req.body);
  res.status(201).send(newIdea);
});

/* GET /api/ideas/:ideaId to get a single idea by id. */
ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

/* PUT /api/ideas/:ideaId to update a single idea by id. */
ideasRouter.put("/:ideaId", (req, res, next) => {
  let updatedIdeaInstance = updateInstanceInDatabase(IDEAS, req.body);
  res.send(updatedIdeaInstance);
});

/* DELETE /api/ideas/:ideaId to delete a single idea by id. */
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId(IDEAS, req.params.ideaId);
  if (deletedIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
