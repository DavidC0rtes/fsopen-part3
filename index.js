const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post', function (req, res) {
	return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		tokens.method(req, res) === 'POST' ? tokens.post(req, res) : '',
	].join(' ')
}))

let persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2
	},
	{
		name:"Dan Abramov",
		number: "12-43-234345",
		id: 3
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4
	}
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	response.send(`<div>
					<p>Phonebook has info for ${persons.length} people</p>
					<p>${new Date()}</p>
				   </div>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	person ? response.json(person) : response.status(404).end
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	return Math.floor(Math.random() * (1000 - 10)) + 10
}

app.post('/api/persons', (request, response) => {
	const body = request.body
	
	if(!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name and/or number missing'
		})
	} else if (body.name && persons.find(person => person.name.match(new RegExp(body.name, "i")))) {
		return response.status(400).json({
			error: 'Name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}

	persons = persons.concat(person)
	response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
