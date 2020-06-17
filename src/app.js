const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validadeRepositoryID(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Repository ID." });
  }

  return next();
}

app.use("/repositories/:id", validadeRepositoryID);

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes,
  };

  repositories.push(repository);
  return response.json(repository).status(200);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found.",
    });
  }

  const { likes } = repositories[repositoryIndex];

  const updatedRepository = { id, title, url, techs, likes };
  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found.",
    });
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found.",
    });
  }

  const repository = repositories[repositoryIndex];
  repository.likes += 1;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
