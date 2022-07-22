const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
conn.on("connected", function () {
  console.log("Connection successful.");
});
conn.on("disconnected", function () {
  console.log("Disconnected successfully.");
});
conn.on("error", console.error.bind(console, "Connection error:"));

module.exports = connection;
