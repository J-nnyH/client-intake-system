const mongoose = require ('mongoose');
const { Schema, model } = mongoose;
const ClientSchema = new Schema({
  surname: String,
  name: String,
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true},
  note: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema)

