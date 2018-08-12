var mongoose = require('mongoose')

var bookSchema = new mongoose.Schema({
	title:{
		type: String,
		required: 'You can not forget the book title. It has to have one!'
	},
	cover:{
		type: String,
		required: 'Is it hardcover or paperback'
	},
	author:{
		type: String,
		required:'Well someone had to write this'
	},
	price:{
		type:Number,
		required:'Enter a dollar value in CAD'
	},
	releaseDate:{
		type:Date,
		required:'It had to come out. If not. How did you get it?'
	}
})
module.exports = mongoose.model('Book', bookSchema)
