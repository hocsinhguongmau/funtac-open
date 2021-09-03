const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("build"));
app.use(express.json());
require("dotenv").config();

// app.use(morgan("tiny"))
// morgan.token("body", (req) => JSON.stringify(req.body))

const Person = require("./models/person");

app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const length = persons.length;
  const time = new Date();
  response.send(
    `<div><p>Phone book has info for ${length} people</p><p>${time}</p>`
  );
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { body } = request;
  if (!body.name) {
    return response.status(400).json({
      error: "Name is required",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number is required",
    });
  }

  const person = new Person({ name: body.name, number: body.number });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
