const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//use get for reading data
router.get('/', (req, res) => {
  req.models.cars.find({}, function(err, cars) {
    if (err) return res.send(err);
    return res.send(cars);
  })
  // return res.send(Object.values(req.dummy.cars));
});

router.get('/:location', (req, res) => {
  req.models.cars.find({'location': { $regex: req.params.location, $options: "i" }}, function(err,cars) {
    if (err) return res.send(err);
    if (cars) return res.send(cars);
    return res.send({});
  });
  // return res.send(req.dummy.cars[req.params.licensePlate]);
});

//use post for creating data
router.post('/', (req, res) => {
  req.models.cars.create({
    type: req.body.type,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxLength: req.body.maxLength
  }, function(err, car) {
      if (err) return res.send(err);
      return res.send(car);
  });
});

//use put for updating data
router.put('/:licensePlate', (req, res) => {
  req.models.cars.find({'licensePlate': req.params.licensePlate}, function(err,car) {
    if (err) return res.send(err);
    //update database entry here
    return res.send(car);
  });
  // return res.send(req.dummy.cars[req.params.licensePlate]);
});

//use delete for deleting data
router.delete('/:licensePlate', (req, res) => {
  req.models.cars.findOne({'licensePlate': req.params.licensePlate}, function(err,car) {
    if (err) return res.send(err);
    if (!car) return res.send("No such car");
    car.remove(function (err, car) {
      if (err) return res.send(err);
      return res.send(car);
    });
  // delete req.dummy.cars[req.params.carId];
  // return res.send(req.dummy.cars);
  });
});

module.exports = router;