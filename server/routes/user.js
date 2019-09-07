const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//use get for reading data
router.get('/', (req, res) => {
  req.models.users.find({}, function(err, users) {
    if (err) return res.send(err);
    return res.send(users);
  })
  // return res.send(Object.values(req.dummy.users));
});

router.get('/:username', (req, res) => {
  req.models.users.find({'username': req.params.username}, function(err,user) {
    if (err) return res.send(err);
    return res.send(user);
  });
  // return res.send(req.dummy.users[req.params.username]);
});

//use post for creating data
router.post('/', (req, res) => {
  //only proceed if a username was provided as part of the request
  if(req.body.username != null && req.body.username != undefined) {
    req.models.users.create({
      username: req.body.username,
      age: req.body.age
    }, function(err, user) {
        if (err) return res.send(err);
        return res.send(user);
    });
  } else {
    return res.send("Username not provided");
  }
});

//use put for updating data
router.put('/:username', (req, res) => {
  req.models.users.find({'username': req.params.username}, function(err,user) {
    if (err) return res.send(err);
    //update database entry here
    return res.send(user);
  });
  //return res.send(req.dummy.users[req.params.userId]);
});

//use delete for deleting data
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