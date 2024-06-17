// Create web server
// Create a server that listens on port 3000
// The server will respond to the following URLs
// /comments - returns all comments
// /comments/:id - returns a specific comment
// /comments/new - adds a new comment
// /comments/delete/:id - deletes a specific comment
// /comments/edit/:id - edits a specific comment
// Each comment should have an id, username, body, and timestamp

// Load the express module
var express = require('express');
// Load the body-parser module
var bodyParser = require('body-parser');
// Load the fs module
var fs = require('fs');
// Load the moment module
var moment = require('moment');
// Load the lodash module
var _ = require('lodash');

// Create a new express server
var app = express();

// Set the server to use the body-parser module
app.use(bodyParser.urlencoded({ extended: true }));

// Create an empty array to store all comments
var comments = [];

// Create a new comment
function createComment(username, body) {
  // Create a new comment object
  var comment = {
    id: comments.length + 1,
    username: username,
    body: body,
    timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
  };
  // Push the new comment object into the comments array
  comments.push(comment);
  // Return the new comment object
  return comment;
}

// Get all comments
app.get('/comments', function(req, res) {
  res.send(comments);
});

// Get a specific comment
app.get('/comments/:id', function(req, res) {
  // Find the comment with the specified id
  var comment = _.find(comments, { id: parseInt(req.params.id) });
  // If the comment does not exist, return an error message
  if (!comment) {
    res.status(404).send('Comment not found');
  }
  // Otherwise, return the comment
  res.send(comment);
});

// Add a new comment
app.post('/comments/new', function(req, res) {
  // Create a new comment
  var comment = createComment(req.body.username, req.body.body);
  // Return the new comment
  res.send(comment);
});

// Delete a specific comment
app.get('/comments/delete/:id', function(req, res) {
  // Find the comment with the specified id
  var comment = _.find(comments, { id: parseInt(req.params.id) });
  // If the comment does not exist, return an error message
  if (!comment) {
    res.status(404).send('Comment not found');
  }
  // Remove the comment from the comments array
  _.remove(comments, comment);
  // Return a success message
  res.send('Comment deleted');
});


// Edit a specific comment using PUT
app.put('/comments/edit/:id', function(req, res) {
  // Find the comment with the specified id
  var comment = _.find(comments, { id: parseInt(req.params.id) });
  // If the comment does not exist, return an error message
  if (!comment) {
    res.status(404).send('Comment not found');
  }
  // Update the comment with the new username and body
  comment.username = req.body.username;
  comment.body = req.body.body;
  // Return the updated comment
  res.send(comment);
});
