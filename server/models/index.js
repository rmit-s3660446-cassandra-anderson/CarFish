const mongoose = require('mongoose');
const users = require('./user');
const cars = require('./car');

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
  cars
};