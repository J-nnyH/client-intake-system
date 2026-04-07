const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  surname: String,
  name: String,
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
}, {
  timestamps: true
});
// const User = model('User', UserSchema);

module.exports= mongoose.model('User', UserSchema)

