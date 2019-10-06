const Router = require('express').Router;
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');

const router = Router();

//get bookings either by car or user, or all bookings in the database
router.get('/', (req, res) => {
  if(req.query.car) {
    req.models.bookings.find({'car': req.query.car}, function(err,bookings) {
      if (err) return res.send(err);
      if (bookings) {
        findMatchingCars(bookings, req, res);
      } else {
        return res.send([]);
      }
    });
  } else if(req.query.user) {
    req.models.bookings.find({'user': req.query.user}, function(err,bookings) {
      if (err) return res.send(err);
      if (bookings) {
        findMatchingCars(bookings, req, res);
      } else {
        return res.send([]);
      }
    });
  } else {
    req.models.bookings.find({}, function(err, cars) {
      if (err) return res.send(err);
      return res.send(bookings);
    });
  }
});

//get the dates a car is booked for
router.get('/dates/:car', (req, res) => {
  let car = mongoose.Types.ObjectId(req.params.car);
  req.models.bookings.find({'car': car}, function(err,bookings) {
    if (err) return res.send(err);
    if (!bookings) return res.send([]);
    let bookedDates = [];
    const dayMilliseconds = 86400000;
    bookings.forEach((booking) => {
      const start = booking.startDate.getTime();
      const end = booking.endDate.getTime();
      bookedDates.push(start);
      let nextDay = start + dayMilliseconds;
      while(true) {
        if(new Date(nextDay).toLocaleDateString() == new Date(end).toLocaleDateString()) {
          bookedDates.push(end);
          break;
        };
        bookedDates.push(nextDay);
        nextDay += dayMilliseconds;
      }
    });
    return res.send(bookedDates);
  });
});

//create a booking
router.post('/', (req, res) => {
  console.log(req.body);
  req.models.bookings.create({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    user: req.body.user,
    cost: req.body.cost,
    car: req.body.car
  }, function(err, booking) {
      if (err) return res.send(err);
      return res.send(booking);
  });
});

module.exports = router;

function findMatchingCars(bookings, req, res) {
  let processed = 0;
  bookings.forEach(async (booking, index) => {
    booking.car = await req.models.cars.findById(booking.car);
    processed++;
    if(processed == bookings.length) {
      return res.send(bookings);
    }
  });
}