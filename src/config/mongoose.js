const mongoose = require("mongoose");

mongoose.connect(process.env.NOSQL_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
