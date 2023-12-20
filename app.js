const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Array to store to-do items
let todos = [];

// Route for displaying the home page with the list of tasks
app.get('/', (req, res) => {
  res.render('index', { todos });
});

// Route for displaying the create page
app.get('/create', (req, res) => {
  res.render('create');
});

// Route for handling new task creation
app.post('/create', (req, res) => {
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect('/');
});

// Route for displaying the edit page for a specific task
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos[id];
  res.render('edit', { id, todo });
});

// Route for handling edited task updates
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const editedTodo = req.body.editedTodo;
  todos[id] = editedTodo;
  res.redirect('/');
});

// Route for handling task deletion and redirecting to home page
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server listening on port 3000'));
