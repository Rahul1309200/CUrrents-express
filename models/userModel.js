
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
    collection: 'data'  // Specify the custom collection name 'data'
});

const User = mongoose.model("User", userSchema);
module.exports = User;