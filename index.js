require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('post', function (req, res) {
	return JSON.stringify(req.body)
})

const app = express()

app.use(express.static('build'))
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({}).then(result => {

		response.send(`<div>
	    				<p>Phonebook has info for ${result} people</p>
	    				<p>${new Date()}</p>
	    			   </div>`)
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    
    const person = { 
        number: body.number
    }

    Person.findOneAndUpdate({ _id:body.id }, person, { new: true, runValidators: true })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	if(body.name === undefined || body.number === undefined) {
		return response.status(400).json({
			error: 'Name and/or number missing'
		})
	}
    
	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
        .then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
