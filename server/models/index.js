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
      password: 'password',
      firstName: "Doctor",
      lastName: "Love",
      email: "drlove@gmail.com",
      ccNumber: 4242424242424242,
      csv: 123,
      licenseNumber: "123ABCZ"
    });
    const user2 = new users({
      username: 'CheekyLover',
      password: 'password',
      firstName: "Cheeky",
      lastName: "Lover",
      email: "cheekylover@gmail.com",
      ccNumber: 4242424242424242,
      csv: 432,
      licenseNumber: "ABZ1234"
    });
    const user3 = new users({
      username: 'StrangerDanger',
      password: 'password',
      firstName: "Stranger",
      lastName: "Danger",
      email: "strangerdanger@gmail.com",
      ccNumber: 4242424242424242,
      csv: 456,
      licenseNumber: "123AFJA"
    });
    const user4 = new users({
      username: 'Batman',
      password: 'password',
      firstName: "Bat",
      lastName: "Man",
      email: "batman@batman.com",
      ccNumber: 4242424242424242,
      csv: 123,
      licenseNumber: "BAT123A"
    });
    const car1 = new cars({
      type: {
        brand: "Ford",
        model: "Fiesta",
        year: 2005,
        doors: 4,
        transmission: "Automatic"
      },
      location: {
        suburb: "Hawthorn",
        street: "Glen Street"
      },
      rate: 50,
      startDate: "2019-10-01",
      endDate: "2020-02-20",
      maxLength: 7,
      userNotes: "Parked outside house number 10",
      user: user1.id
    });
    const car2 = new cars({
      type: {
        brand: "Toyota",
        model: "Camry",
        year: 2012,
        doors: 4,
        transmission: "Automatic"
      },
      location: {
        suburb: "Abbotsford",
        street: "Lithgow Street"
      },
      rate: 40,
      startDate: "2019-10-01",
      endDate: "2019-11-15",
      maxLength: 5,
      userNotes: "Parked outside house number 20",
      user: user2.id
    });
    const car3 = new cars({
      type: {
        brand: "Hyundai",
        model: "Getz",
        year: 2016,
        doors: 4,
        transmission: "Automatic"
      },
      location: {
        suburb: "Collingwood",
        street: "Budd Street"
      },
      rate: 40,
      startDate: "2019-10-01",
      endDate: "2019-11-20",
      maxLength: 5,
      userNotes: "Parked outside house number 2",
      user: user3.id
    });
    const car4 = new cars({
      type: {
        brand: "Ford",
        model: "Falcon XR6",
        year: 2016,
        doors: 4,
        transmission: "Manual"
      },
      location: {
        suburb: "Collingwood",
        street: "Otter Street"
      },
      rate: 60,
      startDate: "2019-10-01",
      endDate: "2019-11-10",
      maxLength: 5,
      userNotes: "Parked outside house number 5",
      user: user3.id
    });
    const car5 = new cars({
      type: {
        brand: "Nissan",
        model: "350Z",
        year: 2009,
        doors: 2,
        transmission: "Automatic"
      },
      location: {
        suburb: "Collingwood",
        street: "Dight Street"
      },
      rate: 35,
      startDate: "2019-10-01",
      endDate: "2019-11-20",
      maxLength: 2,
      userNotes: "Parked outside house number 15",
      user: user4.id
    });
    const car6 = new cars({
      type: {
        brand: "Volkswagon",
        model: "Kombi",
        year: 1990,
        doors: 4,
        transmission: "Manual"
      },
      location: {
        suburb: "Seaford",
        street: "Coolibar ave"
      },
      rate: 300,
      startDate: "2019-10-01",
      endDate: "2019-11-20",
      maxLength: 4,
      userNotes: "Parked outside house number 15",
      user: user4.id
    });
    const booking1 = new bookings({
      startDate: "2019-10-03",
      endDate: "2019-10-07",
      cost: 200,
      user: user2.id,
      car: car1.id
    });
    const booking2 = new bookings({
      startDate: "2019-10-12",
      endDate: "2019-10-15",
      cost: 200,
      user: user3.id,
      car: car1.id
    });
    const booking3 = new bookings({
      startDate: "2019-10-10",
      endDate: "2019-10-15",
      cost: 200,
      user: user1.id,
      car: car2.id
    });
    const booking4 = new bookings({
      startDate: "2019-10-10",
      endDate: "2019-10-15",
      cost: 200,
      user: user1.id,
      car: car3.id
    });
    const booking5 = new bookings({
      startDate: "2019-10-20",
      endDate: "2019-11-01",
      cost: 385,
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
    await car6.save();

    await booking1.save();
    await booking2.save();
    await booking3.save();
    await booking4.save();
    await booking5.save();
  }
};