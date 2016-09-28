var express = require('express');
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// configuration.....

mongoose.connect('mongodb://ismail:ismail123@ds035826.mlab.com:35826/ismail482',{},function(){
	console.log('db connected...');
});

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// server start with node server.js
app.listen('8080',function(){
console.log('listen 8080');
})

// define model
    var Todo = mongoose.model('Todo', {
        text : String
    });
	
	 // get all todos
    app.get('/api/todos', function(req, res) {
        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });
	
	// create todo and send back all todos after creation
    app.post('/ismail', function(req, res) {
		console.log('body parser', req.body);
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
				console.log(todos);
                res.json(todos);
            });
        });
    });
	
	// delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });