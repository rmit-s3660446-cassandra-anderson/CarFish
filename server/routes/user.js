const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//get all users from the database
router.get('/', (req, res) => {
  req.models.users.find({}, function(err, users) {
    if (err) return res.send(err);
    return res.send(users);
  })
  // return res.send(Object.values(req.dummy.users));
});

//find a user by username
router.get('/:username', (req, res) => {
  req.models.users.find({'username': req.params.username}, function(err,user) {
    if (err) return res.send(err);
    return res.send(user);
  });
  // return res.send(req.dummy.users[req.params.username]);
});

//create a user
router.post('/signup', (req, res) => {
  req.models.users.findOne({'username': req.body.username}, function(err,user) {
    if (err) return res.send(err);
    if (user) return res.send({});
    req.models.users.create({
      username: req.body.username,
      password: req.body.password
    }, function(err, user) {
        if (err) return res.send(err);
        return res.send(user);
    });
  });
});

//check if a user exists
router.post('/login', (req, res) => {
  req.models.users.findOne(
    {'username': req.body.username, 'password': req.body.password}, function(err,user) {
      if (err) return res.send(err);
      if (user) return res.send(user);
      return res.send({});
    });
});

//update user details
router.put('/:username', (req, res) => {
  req.models.users.find({'username': req.params.username}, function(err,user) {
    if (err) return res.send(err);
    //update database entry here
    return res.send(user);
  });
  //return res.send(req.dummy.users[req.params.userId]);
});

//delete user from database
router.delete('/:username', (req, res) => {
  req.models.users.findOne({'username': req.params.username}, function(err,user) {
    if (err) return res.send(err);
    if (!user) return res.send("No such user");
    user.remove(function (err, user) {
      if (err) return res.send(err);
      return res.send(user);
    });
  // delete req.dummy.users[req.params.userId];
  // return res.send(req.dummy.users);
  });
});

module.exports = router;