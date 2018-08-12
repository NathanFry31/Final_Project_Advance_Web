var Book = require('../models/books');

//Brings up the index view of books
exports.index = function(req, res, next) {
	let locals = {
		title: 'List of Books'
	};

	Book.find()
	.then(function(books){
		locals.books = books;
		res.render('books/index', locals)
	})
	.catch(function(err){
		next(err)
	});
};

// Brings up the show view for a single book object
exports.show = function(req, res, next){
	let locals = {
		title: 'Books'
	};

	Book.findById({
		_id: req.params.id
	})
	.then(function(books){
		locals.books = books;
		res.render('books/show', locals)
	})
	.catch(function(err){
		next(err)
	})
};
// Getting the new view
exports.new = function(req, res){
	let locals = {
		title: 'New Book'
	};
	res.render('books/new', locals)
};

exports.edit = function(req, res, next){
	let locals = {
		title: 'Edit Books'
	};

	Book.findById({
		_id: req.params.id
	})
	.then(function(books){
		locals.books = books;

		res.render('books/edit', locals)
	})
	.catch(function(err){
		next(err)
	})
};

//For creating a new book object
exports.create = function(req, res, next) {
	Book.create({
		title:req.body.title,
		author:req.body.author,
		cover:req.body.cover,
		price:req.body.price,
		releaseDate:req.body.releaseDate
	})
	.then(function(){
		res.redirect('/books')
	})
	.catch(function(err){
		next(err)
	})
};

//For updating a book
exports.update = function(req, res, next){
	Book.findById(req.params.id)
	.then(function(book){
		book.title = req.body.title;
		book.author = req.body.author;
		book.cover = req.body.cover;
		book.price = req.body.price;
		book.releaseDate = req.body.releaseDate;

		book.save()
		.then(function(){
			res.redirect('/books')
		})
		.catch(function(err){
			next(err)
		})
	})
	.catch(function(err){
		next(err)
	})
};

//Deletes a book from the database
exports.delete = function(req, res){
	Book.remove({
		_id: req.body.id
	})
	.then(function(){
		res.redirect('/books')
	})
	.catch(function(err){
		next(err)
	})
};
