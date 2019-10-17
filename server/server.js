const express = require('express');
const models = require('./models');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

//first check that a database URL is set
// if(!process.env.DATABASE_URL) {
//   return console.log("Please set your database URL as an env variable (DATABASE_URL)");
// }

//initialise the express app
const app = express();
//configure this to whatever port you would like to listen on
const port = 9000;
const cleanAndSeedDB = true;

//to make use of request data, we need to parse it first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//if we want to do something before sending the request off
//to one of our routes, do it here (i.e. authentication)
app.use((req, res, next) => {
  // attach the dummy data to the request for testing
  req.models = models;
  next();
});

//our main routes
app.use('/users', routes.user);
app.use('/cars', routes.car);
app.use('/bookings', routes.booking);

//connect to the database and start the server
mongoose.connect("mongodb+srv://carfish_admin:csit-carfish-2019@cluster0-56z8j.mongodb.net/test?retryWrites=true&w=majority").then(async () => {
  if(cleanAndSeedDB) {
    await Promise.all([
      models.users.deleteMany({}),
      models.cars.deleteMany({}),
      models.bookings.deleteMany({}),
    ]);
    models.seedDB();
  }
  app.listen(port, () => {
    console.log("Express app is listening on port " + port);
  });
}).catch((error) => {
  console.log(error);
});