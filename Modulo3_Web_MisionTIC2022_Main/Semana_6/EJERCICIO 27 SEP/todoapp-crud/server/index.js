const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, ContentType, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://jqb1024:<password>@cluster0.wmr2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));
var db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongoDB');
});

// import todo schema as model
let todoModel = require('./todo_schema');

// ROUTES

app.get('/', (req, res) => {
  res.send('hello');
});

// add todo
app.post('/todo/add', (req, res) => {
  let newTodo = new todoModel();
  newTodo.title = req.body.todo;
  newTodo.completed = false;
  newTodo.save((err) => {
    if (err) {
      console.log(err);
      res.send('Error while adding Todo');
    } else {
      console.log(newTodo);
      res.send('Todo added');
    }
  });
});

// FETCH TO-DO

// completed
app.get('/todo/completed', (req, res) => {
  todoModel.find({ completed: true }, (err, todos) => {
    if (err) {
      res.send('Error while fetching Todos');
    } else {
      res.json(todos);
    }
  });
});

// uncompleted
app.get('/todo/uncompleted', (req, res) => {
  todoModel.find({ completed: false }, (err, todos) => {
    if (err) {
      res.send('Error while fetching Todos');
    } else {
      res.json(todos);
    }
  });
});

// update
app.post('/todo/complete/:id', (req, res) => {
  todoModel.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    (err, todo) => {
      if (!err) {
        res.send('Good Work');
      }
    }
  );
});

// delete todo
app.delete('/todo/:id', (req, res) => {
  let query = { _id: req.params.id };
  todoModel.deleteOne(query, (err) => {
    if (err) {
      res.send('Error while deleting todo');
    } else {
      res.send('Todo deleted');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
