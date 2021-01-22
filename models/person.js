const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(result => {
		console.log('connected to mongoDB')
	})
	.catch((error) => {
		console.log('error connecting to mongoDB', error.message)
	})

const personSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true,
        minlength: 3,
    },
	number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                const num = v.replace(/\D/g, "")
                return num.length >= 8
            },
            message: props => `${props.value} is an invalid phone number, has less than 8 digits.`
        }
    }
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)
