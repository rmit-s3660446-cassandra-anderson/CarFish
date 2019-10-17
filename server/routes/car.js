const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//get cars in the database, either by suburb, user, or all of them
router.get('/', (req, res) => {
  if(req.query.suburb) {
    req.models.cars.find({'location.suburb': { $regex: req.query.suburb, $options: "i" }}, function(err,cars) {
      if (err) return res.send(err);
      if (cars) return res.send(cars);
      return res.send([]);
    });
  } else if(req.query.user) {
    req.models.cars.find({'user': req.query.user}, function(err,cars) {
      if (err) return res.send(err);
      if (cars) return res.send(cars);
      return res.send([]);
    });
  } else {
    req.models.cars.find({}, function(err, cars) {
      if (err) return res.send(err);
      return res.send(cars);
    });
  }
});

//create a car
router.post('/create', (req, res) => {
  req.models.cars.create({
    type: {
      brand: req.body.type.brand,
      model: req.body.type.model,
      year: req.body.type.year,
      doors: req.body.type.doors,
      transmission: req.body.type.transmission
    },
    location: {
      suburb: req.body.location.suburb,
      street: req.body.location.street
    },
    status: 'Listed',
    rate: req.body.rate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxLength: req.body.maxLength,
    user: req.body.user,
    userNotes: req.body.userNotes
  }, function(err, car) {
      if (err) return res.send(err);
      return res.send(car);
  });
});

// //update car details
// router.put('/:licensePlate', (req, res) => {
//   req.models.cars.find({'licensePlate': req.params.licensePlate}, function(err,car) {
//     if (err) return res.send(err);
//     //update database entry here
//     return res.send(car);
//   });
//   // return res.send(req.dummy.cars[req.params.licensePlate]);
// });

// unlist a car
router.delete('/:carId', (req, res) => {
  req.models.cars.findById(req.params.carId, async function(err, car) {
    if (err) return res.send(err);
    car.status = "Unlisted";
    await car.save();
    return res.send(car);
  });
});

module.exports = router;