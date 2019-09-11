const express = require('express');
const models = require('./models');
const routes = require('./routes');

//initialise the express app
const app = express();
//configure this to whatever port you would like to listen on
const port = 9000;

//to make use of request data, we need to parse it first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//if we want to do something before sending the request off
//to one of our routes, do it here (i.e. authentication)
app.use((req, res, next) => {
  // attach the dummy data to the request for testing
  req.dummy = models;
  console.log("Dummy data");
  console.log(req.dummy);
  next();
});

//our main routes
app.use('/users', routes.user);
app.use('/cars', routes.car);

//start the server
app.listen(port, () => {
  console.log("Express app is listening on port " + port);
});