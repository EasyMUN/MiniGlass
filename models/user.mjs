import mongoose from 'mongoose';

export default mongoose.model('User', {
  email: {
    type: String,
    unique: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  primary: String,
  secondary: String,
  code: String,
});
