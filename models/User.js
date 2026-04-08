const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  surname: String,
  name: String,
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  role: { type: String, enum: ['user', 'guest'], default: 'user' },
  expiresAt: {type: Date, default: null}
}, {
  timestamps: true
});
//TTL for guest
UserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports= mongoose.model('User', UserSchema)

