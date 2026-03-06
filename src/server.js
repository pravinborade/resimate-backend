const { port } = require("./config/env");
// 🔥 THIS LINE triggers database.js
require("./config/db");
const express = require('express');
const app = express();
app.use(express.json());


const authRouter=require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use("/api/v1",authRouter)

app.get('/', (req, res) => {
  res.send('Node API running');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log('Server running on',port);
});