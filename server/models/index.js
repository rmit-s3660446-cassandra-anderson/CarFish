const mongoose = require('mongoose');
const users = require('./user');
const cars = require('./car');
const bookings = require('./booking');

//dummy data for testing purposes
// let users = {
//   1: {
//     id: '1',
//     name: 'Jojo Bear',
//   },
//   2: {
//     id: '2',
//     username: 'Ronald Mcdonald',
//   },
// };

// let cars = {
//   1: {
//     id: '1',
//     type: 'Honda Civic',
//     userId: '1',
//   },
//   2: {
//     id: '2',
//     type: 'Ford Fiesta',
//     userId: '2',
//   },
// };

module.exports = {
  users,
  cars,
  bookings,
  seedDB: async () => {
    console.log("Seeding the Database!")
    const user1 = new users({
      username: 'DrLove',
      password: 'password'
    });
    const user2 = new users({
      username: 'CheekyLover',
      password: 'password'
    });
    const user3 = new users({
      username: 'StrangerDanger',
      password: 'password'
    });
    const user4 = new users({
      username: 'Batman',
      password: 'password'
    });
    const car1 = new cars({
      type: "Ford Fiesta",
      location: "Hawthron",
      startDate: "2019-10-01",
      endDate: "2019-10-20",
      maxLength: 7,
      user: user1.id
    });
    const car2 = new cars({
      type: "Toyota Camry",
      location: "Abbotsford",
      startDate: "2019-10-01",
      endDate: "2019-11-15",
      maxLength: 5,
      user: user2.id
    });
    const car3 = new cars({
      type: "Hyundai Getz",
      location: "Collingwood",
      startDate: "2019-10-01",
      endDate: "2019-11-20",
      maxLength: 5,
      user: user3.id
    });
    const car4 = new cars({
      type: "Ford Falcon",
      location: "Collingwood",
      startDate: "2019-10-01",
      endDate: "2019-11-10",
      maxLength: 5,
      user: user3.id
    });
    const car5 = new cars({
      type: "Batmobile",
      location: "Gotham",
      startDate: "2019-10-01",
      endDate: "2019-11-20",
      maxLength: 2,
      user: user4.id
    });
    const booking1 = new bookings({
      startDate: "2019-10-03",
      endDate: "2019-10-07",
      user: user2.id,
      car: car1.id
    });
    const booking2 = new bookings({
      startDate: "2019-10-12",
      endDate: "2019-10-15",
      user: user3.id,
      car: car1.id
    });
    const booking3 = new bookings({
      startDate: "2019-10-10",
      endDate: "2019-10-15",
      user: user1.id,
      car: car2.id
    });
    const booking4 = new bookings({
      startDate: "2019-10-10",
      endDate: "2019-10-15",
      user: user1.id,
      car: car3.id
    });
    const booking5 = new bookings({
      startDate: "2019-10-20",
      endDate: "2019-11-01",
      user: user3.id,
      car: car5.id
    });
    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();

    await car1.save();
    await car2.save();
    await car3.save();
    await car4.save();
    await car5.save();

    await booking1.save();
    await booking2.save();
    await booking3.save();
    await booking4.save();
    await booking5.save();
  }
};