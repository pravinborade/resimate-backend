const { port } = require("./config/env");
// 🔥 THIS LINE triggers database.js
require("./config/db");
const express = require('express');
const app = express();



app.get('/', (req, res) => {
  res.send('Node API running');
});

app.listen(port, () => {
  console.log('Server running on',port);
});