const mongoose = require("mongoose");

const schema = mongoose.Schema({
   id: String,
   name: String,
   username: String,
   password: String,
   mail: String,
   description: String,
   date: Number,
   photo: String,
   banner: String,
   followers: Array,
   following: Array
})

module.exports = mongoose.model("user", schema)