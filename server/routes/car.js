const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//use get for reading data
router.get('/', (req, res) => {
  return res.send(Object.values(req.dummy.cars));
});

router.get('/:carId', (req, res) => {
  return res.send(req.dummy.cars[req.params.carId]);
});

//use post for creating data
router.post('/', (req, res) => {
  //only proceed if a car type was provided as part of the request
  if(req.body.carType != null && req.body.carType != undefined) {
    const id = uuidv4();
    const car = {
      id,
      type: req.body.carType,
      userId: 1,
    };
    req.dummy.cars[id] = car;
    return res.send(car);
  } else {
    return res.send("Type not provided");
  }
});

//use put for updating data
router.put('/:carId', (req, res) => {
  //update database entry here
  return res.send(req.dummy.cars[req.params.carId]);
});

//use delete for deleting data
router.delete('/:carId', (req, res) => {
  delete req.dummy.cars[req.params.carId];
  return res.send(req.dummy.cars);
});

module.exports = router;