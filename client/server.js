const express = require('express');
const path = require('path');

//initialise express
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/Carfish'));

app.listen(port, () => {
  console.log("Express app is listening on port " + port);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/Carfish/index.html'));
});
