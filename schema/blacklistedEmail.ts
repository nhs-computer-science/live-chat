import Mongoose from 'mongoose';

const BlacklistedEmail = new Mongoose.Schema(
  {
    email: {
      type: String,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('blacklistedEmail', BlacklistedEmail);
