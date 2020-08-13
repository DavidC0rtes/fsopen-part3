const mongoose = require('mongoose')

const args = process.argv.length

if (args < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
const url =
	`mongodb+srv://fullstack:${password}@cluster0.zofv8.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (args >= 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
		mongoose.connection.close()
	})

} else {
	Person.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}
