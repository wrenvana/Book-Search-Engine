const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });


mongoose.connect(
  process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/googlebooks',
);

module.exports = mongoose.connection;