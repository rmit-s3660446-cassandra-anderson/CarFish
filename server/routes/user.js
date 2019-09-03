const Router = require('express').Router;
const uuidv4 = require('uuid/v4');

const router = Router();

//use get for reading data
router.get('/', (req, res) => {
  return res.send(Object.values(req.dummy.users));
});

router.get('/:userId', (req, res) => {
  return res.send(req.dummy.users[req.params.userId]);
});

//use post for creating data
router.post('/', (req, res) => {
  //only proceed if a username was provided as part of the request
  if(req.body.name != null && req.body.name != undefined) {
    const id = uuidv4();
    const user = {
      id,
      name: req.body.name,
    };
    req.dummy.users[id] = user;
    return res.send(user);
  } else {
    return res.send("Username not provided");
  }
});

//use put for updating data
router.put('/:userId', (req, res) => {
  //update database entry here
  return res.send(req.dummy.users[req.params.userId]);
});

//use delete for deleting data
router.delete('/:userId', (req, res) => {
  delete req.dummy.users[req.params.userId];
  return res.send(req.dummy.users);
});

module.exports = router;