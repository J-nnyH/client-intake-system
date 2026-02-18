import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  surname: String,
  name: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
}, {
  timestamps: true
});
// const User = model('User', UserSchema);

module.exports= mongoose.model('User', UserSchema)

