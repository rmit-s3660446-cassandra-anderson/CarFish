const Router = require('express').Router;
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');

const router = Router();

//use all the bookings in the database
router.get('/', (req, res) => {
  req.models.bookings.find({}, function(err, bookings) {
    if (err) return res.send(err);
    return res.send(bookings);
  })
});

//get all the bookings for a car
router.get('/:car', (req, res) => {
  req.models.bookings.find({'car': req.params.car}, function(err,bookings) {
    if (err) return res.send(err);
    if (cars) return res.send(bookings);
    return res.send([]);
  });
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
  req.models.bookings.create({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    user: req.body.user,
    car: req.body.car
  }, function(err, booking) {
      if (err) return res.send(err);
      return res.send(booking);
  });
});

module.exports = router;