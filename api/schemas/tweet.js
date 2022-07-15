const mongoose = require("mongoose");

const schema = mongoose.Schema({
   user: String,
   likes: String,
   date: String,
   content: String
})

module.exports = mongoose.model("tweet", schema)