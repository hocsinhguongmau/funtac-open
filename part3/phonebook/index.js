const http = require("http")
const morgan = require("morgan")
const express = require("express")
const app = express()
// app.use(morgan("tiny"))

// morgan.token("body", (req) => JSON.stringify(req.body))

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
		].join(" ")
	}),
)
let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramovssss",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck1",
		number: "39-23-6423122",
	},
]

app.get("/api/persons", (request, response) => {
	response.json(persons)
})

app.get("/info", (request, response) => {
	const length = persons.length
	const time = new Date()
	response.send(
		`<div><p>Phone book has info for ${length} people</p><p>${time}</p>`,
	)
})

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find((person) => {
		return person.id === id
	})
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter((note) => note.id !== id)

	response.status(204).end()
})

app.post("/api/persons", (request, response) => {
	const body = request.query
	const id = Math.floor(Math.random() * 10000)
	if (!body.name) {
		return response.status(400).json({
			error: "Name is required",
		})
	}
	if (!body.number) {
		return response.status(400).json({
			error: "Number is required",
		})
	}

	// if (persons.filter((person) => person.name === body.name)) {
	// 	return response.status(400).json({
	// 		error: "Name must be unique",
	// 	})
	// }

	const newPersons = [
		...persons,
		{ id: id, name: body.name, number: body.number },
	]
	response.json(newPersons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
