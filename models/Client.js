const mongoose = require ('mongoose');
const { Schema, model } = mongoose;
const ClientSchema = new Schema({
  surname: { type: String },
  name: { type: String },
  email: { type: String, required: true},
  status: { type: String, required: true},
  note: { type: String },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: {type: Date, default: null}
}, {
  timestamps: true
});

// email uniqueness for same user
ClientSchema.index({ email: 1, owner: 1 },{ unique: true });
// TTL for guest user
ClientSchema.index({expiresAt: 1}, {expireAfterSeconds:0})

module.exports = mongoose.model('Client', ClientSchema)

