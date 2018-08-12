var Book = require('../models/books');

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

//For Show
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
// For the New
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

//For the Create
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

//For the update
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

//For the delete
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
