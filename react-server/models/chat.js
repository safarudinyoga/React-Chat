const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    message: String
})

module.exports = mongoose.model("Chat", todoSchema); 