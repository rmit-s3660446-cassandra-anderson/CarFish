const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//get all the cars in the database
router.get('/', (req, res) => {
  req.models.cars.find({}, function(err, cars) {
    if (err) return res.send(err);
    return res.send(cars);
  })
  // return res.send(Object.values(req.dummy.cars));
});

//get cars by suburb
router.get('/:suburb', (req, res) => {
  req.models.cars.find({'location.suburb': { $regex: req.params.suburb, $options: "i" }}, function(err,cars) {
    if (err) return res.send(err);
    if (cars) return res.send(cars);
    return res.send([]);
  });
  // return res.send(req.dummy.cars[req.params.licensePlate]);
});

//create a car
router.post('/', (req, res) => {
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
    rate: req.body.rate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxLength: req.body.maxLength,
    user: req.body.user,
    userNotes: req.body.notes
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

//delete a car from the database
// router.delete('/:licensePlate', (req, res) => {
//   req.models.cars.findOne({'licensePlate': req.params.licensePlate}, function(err,car) {
//     if (err) return res.send(err);
//     if (!car) return res.send("No such car");
//     car.remove(function (err, car) {
//       if (err) return res.send(err);
//       return res.send(car);
//     });
//   // delete req.dummy.cars[req.params.carId];
//   // return res.send(req.dummy.cars);
//   });
// });

module.exports = router;