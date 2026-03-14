const mongoose = require ('mongoose');
const { Schema, model } = mongoose;
const ClientSchema = new Schema({
  surname: { type: String },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true},
  note: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema)

