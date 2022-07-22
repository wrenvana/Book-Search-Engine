const { connect } = require('mongoose');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.on("connected", function () {
  console.log("Connection successful.");
});
connection.on("disconnected", function () {
  console.log("Disconnected successfully.");
});
connection.on("error", console.error.bind(console, "Connection error:"));

module.exports = connection;
